import { LibraryService } from 'src/app/Services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-library',
  templateUrl: './manage-library.component.html',
  styleUrls: ['./manage-library.component.css']
})
export class ManageLibraryComponent implements OnInit {

  @ViewChild('createNewLibrary') createNewLibrary!: TemplateRef<any>;
  @ViewChild('updateLibrary') updateLibrary!: TemplateRef<any>;
  @ViewChild('deleteLibrary') deleteLibrary!: TemplateRef<any>;

  createLibrary:FormGroup= new FormGroup({
    Library_Name:new FormControl('',[Validators.required]),
    Location:new FormControl('',[Validators.required]),
    Description:new FormControl('',[Validators.required]),
    Image:new FormControl('',[Validators.required])
  });

  updatelibrary:FormGroup= new FormGroup({
    id:new FormControl(''),
    Library_Name:new FormControl('',[Validators.required]),
    Location:new FormControl('',[Validators.required]),
    Description:new FormControl('',[Validators.required]),
    Image:new FormControl('')
  });

  constructor(private dialog:MatDialog,public library:LibraryService ) { }

  selectedLibrary:any;
  id :any;

  ngOnInit(): void {
    this.library.getAllLibraries();
  }

  openCreateDialog(){
    this.dialog.open(this.createNewLibrary);
  }

  openUpdateDialog(library:any){
    this.selectedLibrary = library;
    this.updatelibrary.controls['id'].setValue(library.id);
    this.dialog.open(this.updateLibrary);
  }

  openDeleteDialog(id:number) {
    this.id =id;
    this.dialog.open(this.deleteLibrary);
  }

  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.library.uploadAttachment(fromData);
  }

  submit(){
    this.library.createLibrary(this.createLibrary.value);
    location.reload();
  }

  update(){
    let image : string = this.updatelibrary.controls['Image'].value;
    if(!image){
      this.library.display_Image = this.selectedLibrary.image;
    }
    this.library.updateLibrary(this.updatelibrary.value);
    location.reload();

  }

  delete(){
    this.library.deleteLibrary(this.id);
    location.reload();
  }





}
