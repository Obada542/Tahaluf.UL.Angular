import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  display_Image:any;
  books: any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  getAllBooks() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/book/getbestbooks').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved!!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }
  createBook(data:any){
    this.spinner.show();
    data.imagename=this.display_Image;
    this.http.post('https://localhost:44346/api/CreateBook/',data)
    .subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Create Book Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44346/api/book/uploadImage/',file)
    .subscribe((res:any)=>{
      if(res)
      console.log(res);
      this.display_Image=res.imagename;
    },err=>{
      this.toastr.error(err.message , err.status);
    })
  }
}
