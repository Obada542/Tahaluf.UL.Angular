import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-home',
  templateUrl: './manage-home.component.html',
  styleUrls: ['./manage-home.component.css']
})
export class ManageHomeComponent implements OnInit {

  @ViewChild('createslider') createslider! :TemplateRef<any>
  @ViewChild('callUpdateDailog') callUpdateDailog! :TemplateRef<any>
  @ViewChild('callDeleteDailog') callDeleteDailog! :TemplateRef<any>
  
  createHome: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    sub_Title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    
  })

  updateForm:FormGroup=new FormGroup({
    id:new FormControl(''),
    title: new FormControl('', Validators.required),
    sub_Title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
  })


  constructor(private dialog:MatDialog, public home:HomeService) { }
  selectedSlider!: any;
  managehome:any={};
  Id:any;
  sliders: Array<any> = [];

  ngOnInit(): void {
    this.home.getAll();
  }

  create()
  {
    this.dialog.open(this.createslider);
  }

  openCreateDialog() {
    this.dialog.open(this.createslider)
  }

  uploadImage(file:any){
    if(file.length===0)
    return;
    const uploadfile=<File>file[0];
    const formData=new FormData();
    formData.append('file',uploadfile,uploadfile.name);
    this.home.uploadAttachment(formData);
  }



update(){
  this.home.updateHome(this.updateForm.value);
  location.reload();

}

openUpdateDailog(home:any)
{
    this.selectedSlider=home;
    this.updateForm.controls['id'].setValue(home.id); 
    this.dialog.open(this.callUpdateDailog);
  }


  openDeleteDailog(id:number)
  {
    this.Id=id;
      const dialogRef=this.dialog.open(this.callDeleteDailog);
      dialogRef.afterClosed().subscribe((result)=>{
        if(result!=undefined)
        {
          if(result=='yes')
          this.home.deleteItem(id);
          else if(result=='no')
          console.log("Thank you ");
          
        }
      })
  }
  delete(){
    this.home.deleteItem(this.Id);
    location.reload();
  }

  submit(){
    this.home.createSliders(this.createHome.value);
    location.reload();
  }

  searchSlider(event: any) {
    var searchsliders: Array<any> = [];
    for (let i = 0; i < this.home.data.length; i++) {
      const slider: string = this.home.data[i].title.toLowerCase();
      if (slider.includes(event.target.value.toLowerCase())) {
        searchsliders.push(this.home.data[i]);
      }
    }
      this.sliders = searchsliders;
  }

}
