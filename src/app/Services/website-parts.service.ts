import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class WebsitePartsService {

  constructor(private http:HttpClient,private toastr:ToastrService,private spinner:NgxSpinnerService ) { }

  header:any= {};
  display_Image:any;
  footer:any={};
  background:any=[];
  display_Image2:any;
  about:any={};
  contact :any = {};

  ///////// Header /////////
  getHeader(){
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Header/').subscribe((res)=>{
        this.header= res;
        this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }

  uploadAttachment2(file:FormData)
  {
    this.http.post('https://localhost:44346/api/Header/uploadImage/',file)
    .subscribe((res:any)=>{
      this.display_Image2=res.logo;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }

  updateHeader(body:any){
    this.spinner.show();
    body.logo= this.display_Image2;
    this.http.put('https://localhost:44346/api/Header/Update/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('updated Successfully :)') ;
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message , err.status)
    })
  }

  ///////////Footer///////////
  getFooter(){
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Footer/GetFooter').subscribe((res)=>{
        this.footer= res;
        this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }
  updateFooter(body:any){
    this.spinner.show();
    this.http.put('https://localhost:44346/api/Footer/UpdateFooter/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('updated Successfully :)') ;
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message , err.status)
    })
  }
  ////////// Background ///////////
  getBackground(){

    this.spinner.show();
    this.http.get('https://localhost:44346/api/Background/GetBackground').subscribe((res)=>{
        this.background= res;
        this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }

  createBackground(body:any){

      this.spinner.show;
      body.background= this.display_Image;
      this.http.post('https://localhost:44346/api/Background/CreateBackground/',body).subscribe((res)=>{
        this.spinner.hide;
        this.toastr.success('Create Background Successfully :)');
      },err=>{
        this.spinner.hide();
        this.toastr.error(err.message , err.status)
      })
  }

  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44346/api/Background/uploadImage/',file)
    .subscribe((res:any)=>{
      this.display_Image=res.background;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }
  updateBackground(body:any){
    this.spinner.show();
    body.background= this.display_Image

    this.http.put('https://localhost:44346/api/Background/UpdateBackground/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('updated Successfully :)') ;
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message , err.status)
    })
  }
  ////////// About ////////////

   getAbout(){

    this.spinner.show();
    this.http.get('https://localhost:44346/api/About/AboutUl').subscribe((res)=>{
        this.about= res;
        this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
   }

   updateAbout(body:any){
    this.spinner.show();

    this.http.put('https://localhost:44346/api/About/UpdateAbout/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('updated Successfully :)') ;
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message , err.status)
    })
  }

  ////////////// Contact ////////////////
  getContact(){
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Contact/GetContact').subscribe((res)=>{
        this.contact= res;
        this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
   }
   updateContact(body:any){
    this.spinner.show();

    this.http.put('https://localhost:44346/api/Contact/UpdateContact/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('updated Successfully :)') ;
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message , err.status)
    })
  }
}
