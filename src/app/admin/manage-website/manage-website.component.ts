import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WebsitePartsService } from 'src/app/Services/website-parts.service';

@Component({
  selector: 'app-manage-website',
  templateUrl: './manage-website.component.html',
  styleUrls: ['./manage-website.component.css']
})
export class ManageWebsiteComponent implements OnInit {

  
  @ViewChild('updateBackground') updateBackground!: TemplateRef<any>;
  @ViewChild('createBackground') createBackground!: TemplateRef<any>;


  updateheader:FormGroup= new FormGroup({
    title:new FormControl('',[Validators.required]),
    logo:new FormControl('')
  });

  updatefooter:FormGroup= new FormGroup({
    Facebook:new FormControl('',[Validators.required]),
    Twitter:new FormControl('',[Validators.required]),
    Instagram:new FormControl('',[Validators.required]),
    Small_Desc:new FormControl('',[Validators.required])
    
  });

  updatebackground:FormGroup= new FormGroup({
    Page_Name:new FormControl(''),
    background:new FormControl('')
  });


  updatecontact:FormGroup= new FormGroup({
    Title:new FormControl('',[Validators.required]),
    Sub_Title:new FormControl('',[Validators.required]),
    Description:new FormControl('',[Validators.required]),
    Email:new FormControl('',[Validators.required]),
    numbers:new FormControl('',[Validators.required]),
    addresses:new FormControl('',[Validators.required])
  });

  updateabout:FormGroup= new FormGroup({
    Title:new FormControl('',[Validators.required]),
    Sub_Title:new FormControl('',[Validators.required]),
    Descriptions:new FormControl('',[Validators.required]),
  });

  createbackground:FormGroup= new FormGroup({
    Page_Name:new FormControl('',[Validators.required]),
    background:new FormControl('',[Validators.required])
  });


  constructor(private dialog:MatDialog,public website:WebsitePartsService) { }
 

  selectedHeader:any;
  selectedFooter:any;
  selectedBackground:any;
  selectedContact:any;
  selectedAbout:any;





  ngOnInit(): void {
    this.website.getHeader();
    this.website.getFooter();
    this.website.getBackground();
    this.website.getContact();
    this.website.getAbout();
  }


  // openUpdateDialogHeader(header:any){
  //   this.selectedHeader= header;
   
  // }

  // openUpdateDialogFooter(footer:any){
  //   this.selectedFooter= footer;
  //   this.dialog.open(this.updateFooter);
  // }
  openUpdateDialogBackground(background:any){
    this.selectedBackground= background;
    this.updatebackground.controls['Page_Name'].setValue(background.Page_Name);
    this.dialog.open(this.updateBackground);
  }

 

  

  openCreateDialogBackground(){
    this.dialog.open(this.createBackground);
  }

  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.website.uploadAttachment(fromData);
  }

  uploadFile2(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.website.uploadAttachment2(fromData);
  }

  updateH(){
    let image : string = this.updateheader.controls['logo'].value;
    if(!image){
      this.website.display_Image2 = this.updateheader.value.logo;
  
    }
    this.website.updateHeader(this.updateheader.value);
    location.reload();

  }

  updateF(){
    this.website.updateFooter(this.updatefooter.value);
    location.reload();
  }

  updateB(){
    let image : string = this.updatebackground.controls['background'].value;
    if(!image){
      this.website.display_Image = this.selectedBackground.background;
    }
    this.website.updateBackground(this.updatebackground.value);
    location.reload();

  }

  updateC(){
    this.website.updateContact(this.updatecontact.value);
    location.reload();
  }

  updateA(){
    this.website.updateAbout(this.updateabout.value);
    location.reload();
  }


  submit(){
    this.website.createBackground(this.createbackground.value);
    location.reload();
  }


}
