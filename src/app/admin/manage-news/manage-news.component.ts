import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewsService } from 'src/app/Services/news.service';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.css']
})
export class ManageNewsComponent implements OnInit {
  @ViewChild('createNewNews') createNewNews!: TemplateRef<any>;
  @ViewChild('updateNews') updateNews!: TemplateRef<any>;
  @ViewChild('deleteNews') deleteNews!: TemplateRef<any>;

  selectedNews!: any;
  id: any;
  newss: Array<any> = [];

  createnew: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', )
    
  });

  updatenew: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),  
    image: new FormControl('',),
  });
  searchnew: any;

  constructor(private dialog: MatDialog, public news: NewsService) { }

  ngOnInit(): void {
    this.news.getAllNews();
  }
  openCreateDialog() {
    this.dialog.open(this.createNewNews)
  }
  openUpdateDialog(newws: any) {
    this.selectedNews = newws;
    this.updatenew.controls['id'].setValue(newws.id);
    this.dialog.open(this.updateNews);
  }
  openDeleteDialog(id: number) {
    this.id = id;
    this.dialog.open(this.deleteNews)
  }
  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.news.uploadAttachment(fromData);
  }
  submit() {
    this.news.createNews(this.createnew.value);
    location.reload();
  }
  update() {
    this.news.updateNews(this.updatenew.value);
    location.reload();
  }
  delete() {
    this.news.deleteNews(this.id);
    location.reload();
  }
  searchNews(event: any) {
    var searchnew: Array<any> = [];
    for (let i = 0; i < this.news.newss.length; i++) {
      const news: string = this.news.newss[i].title.toLowerCase();
      if (news.includes(event.target.value.toLowerCase())) {
        this.searchnew.push(this.news.newss[i]);
      }
    }
      this.newss = searchnew;
  }

}
