import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  display_Image:any;
  newss: any;

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  getAllNews()
  {
    this.spinner.show();
    return this.http.get('https://localhost:44346/api/news').subscribe((res) => {
      this.newss = res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved!!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  createNews(data:any)
  {
    this.spinner.show();
    data.image=this.display_Image;
    this.http.post('https://localhost:44346/api/news/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Create News Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
    
  }
  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44346/api/news/uploadImage/',file)
    .subscribe((res:any)=>{
      if(res)
      this.display_Image=res.image;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }

  updateNews(data:any)
  {
    this.spinner.show();
    data.image=this.display_Image;
    this.http.put('https://localhost:44346/api/news/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update News Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

  deleteNews(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:44346/api/news/delete/' + id).subscribe((res)=>{
      this.spinner.hide();
      this.toastr.warning('Delete News Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

  }

 