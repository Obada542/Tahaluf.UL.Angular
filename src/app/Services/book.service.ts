import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  pdf:any;
  display_Image:any;
  books: any;
  book: any;
  libraries: any;
  newestBooks:any;
  categories:any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  getAllBooks() {
    this.spinner.show();
    this.getAllLibraries();
    return this.http.get('https://localhost:44346/api/book/GetBooks').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getBookById(id:any) {
    this.spinner.show();
    this.getAllLibraries();
    return this.http.get('https://localhost:44346/api/book/GetBookById/'+id).subscribe((res) => {
      this.book = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getBestBooks() {
    this.spinner.show();
    return this.http.get('https://localhost:44346/api/book/getbestbooks').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getNewestBooks(){
    this.spinner.show();
    return this.http.get('https://localhost:44346/api/book/GetNewestBooks').subscribe((res) => {
      this.newestBooks = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getAvailableBook() {
    this.spinner.show();
    return this.http.get('https://localhost:44346/api/book/GetAvailableBook').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Sorry we facing some issuse with data");
    });
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
  getCategories() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/book/getCategories').subscribe((res) => {
      this.spinner.hide();
      this.categories = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  createBook(data:any){
    this.spinner.show();
    data.image=this.display_Image;
    data.pdf=this.pdf;

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
      this.display_Image=res.image;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }
  uploadPdf(file:FormData)
  {
    this.http.post('https://localhost:44346/api/book/uploadPdf/',file)
    .subscribe((res:any)=>{
      this.pdf=res.pdf;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }
  updateBook(data:any){
    this.spinner.show();
    data.image=this.display_Image;
    data.pdf=this.pdf;
    this.http.put('https://localhost:44346/api/book/UpdateBook/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update Book Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
  changeDiscount(data:any){
    this.spinner.show();
    const discount:number = data;
    this.http.put('https://localhost:44346/api/book/ChangeBookDiscount/', discount).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update Discount Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    });
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
