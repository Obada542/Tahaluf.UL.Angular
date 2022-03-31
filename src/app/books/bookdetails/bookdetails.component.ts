import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component,OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookService } from 'src/app/Services/book.service';
import { Subscription } from 'rxjs';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit ,OnDestroy{
  private subscription!: Subscription;
  totalPages:any;
  @ViewChild('page') page!:TemplateRef<any>;
  currentpage!:number;
  constructor(public book:BookService,private route:ActivatedRoute,private dialog:MatDialog) { }

  ngOnInit(): void {
    var id:any;
    this.route.params.subscribe(params => {
        id=params['id'];
    });
    this.book.getBookById(id);
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
  libraryname(id:number){
    if(this.book.libraries)
      return this.book.libraries.find((x:any)=>x.id==id).library_Name;
  }
  getPages(pdf:PDFDocumentProxy){
      this.totalPages = pdf.numPages;
  }
  openPage(page:number){
    this.currentpage = page;
    this.dialog.open(this.page);
  }
}
