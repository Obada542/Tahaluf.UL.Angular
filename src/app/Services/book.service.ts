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
  libraries: any;

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
  getAllLibraries() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/library/GetLibraries').subscribe((res) => {
      this.spinner.hide();
      this.libraries = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  createBook(data:any){
    this.spinner.show();
    data.image=this.display_Image;
    this.http.post('https://localhost:44346/api/book/CreateBook/',data).subscribe((res:any)=>{
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
      this.display_Image=res.image;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }
  updateBook(data:any){
    this.spinner.show();
    data.image=this.display_Image;
    this.http.put('https://localhost:44346/api/book/UpdateBook/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update Book Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
  
  deleteBook(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:44346/api/book/DeleteBook/' + id).subscribe((res)=>{
      this.spinner.hide();
      this.toastr.warning('Delete Book Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
}