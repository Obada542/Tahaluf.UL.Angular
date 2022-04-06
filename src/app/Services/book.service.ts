import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  pdf: any;
  display_Image: any;
  books: any = [];
  book: any;
  libraries: any;
  newestBooks: any;
  categories: any;
  rates: any;
  bookRates: any;
  search = '';
  library = '';
  data1:any;
  data:any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  getAllBooks() {

    this.http.get('https://localhost:44346/api/book/GetBooks').subscribe((res: any) => {
      this.books = res
      this.spinner.hide();
    }, err => {
      this.toastr.error(err.message, err.status);
    });

  }
  getBookById(id: any) {
    this.spinner.show();
    const call1 = this.http.get('https://localhost:44346/api/book/GetBookById/' + id)
    const call2 = this.http.get('https://localhost:44346/api/rating/' + id)
    const call3= this.http.get('https://localhost:44346/api/Comment/'+id)
    const call4= this.http.get('https://localhost:44346/api/Recomment/'+id)
    return forkJoin(call1, call2,call3,call4).subscribe(([res1,res2,res3,res4]) => {
      this.book = res1;
      this.bookRates = res2;
      this.data=res3;
      this.data1=res4
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getBooksByLibrary(library: string) {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/book/SearchByLibrary/' + library).subscribe((res) => {
      this.books = res;
      this.library = ''
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getBestBooks() {
    this.spinner.show();
    const best = this.http.get('https://localhost:44346/api/book/getbestbooks')
    const newest = this.http.get('https://localhost:44346/api/book/GetNewestBooks')

    forkJoin(best, newest).subscribe(([res1, res2]) => {
      this.books = res1;
      this.newestBooks = res2;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getAvailableBook() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/book/GetAvailableBook').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error("Sorry we facing some issuse with data");
    });
  }
  searchBook(book: any) {
    this.spinner.show();

    this.http.get('https://localhost:44346/api/book/Search/' + book).subscribe((res) => {
      this.books = res;
      this.search = '';
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  createBook(data: any) {
    this.spinner.show();
    data.image = this.display_Image;
    data.pdf = this.pdf;

    this.http.post('https://localhost:44346/api/book/CreateBook/', data).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Create Book Successfully :)')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }
  getAllRates() {
    this.spinner.show()
    
    const rates = this.http.get('https://localhost:44346/api/rating')
    const categories = this.http.get('https://localhost:44346/api/book/getCategories')
    const libraries = this.http.get('https://localhost:44346/api/library/GetLibraries')

    forkJoin(rates, categories,libraries).subscribe(([res1, res2,res3]) => {
      this.rates = res1;
      this.categories = res2;
      this.libraries = res3;

      this.spinner.hide();
      
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  submitRate(review: any) {
    this.spinner.show()
    this.http.post('https://localhost:44346/api/rating', review).subscribe((res) => {
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.success("Thank you :).");
      location.reload
    });
  }
  uploadAttachment(file: FormData) {
    this.http.post('https://localhost:44346/api/book/uploadImage/', file)
      .subscribe((res: any) => {
        this.display_Image = res.image;
      }, err => {
        this.toastr.error(err.message, err.status);
      });
  }
  uploadPdf(file: FormData) {
    this.http.post('https://localhost:44346/api/book/uploadPdf/', file)
      .subscribe((res: any) => {
        this.pdf = res.pdf;
      }, err => {
        this.toastr.error(err.message, err.status);
      });
  }
  updateBook(data: any) {
    this.spinner.show();
    data.image = this.display_Image;
    data.pdf = this.pdf;
    this.http.put('https://localhost:44346/api/book/UpdateBook/', data).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Update Book Successfully :)')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }
  changeDiscount(data: any) {
    this.spinner.show();
    const discount: number = data;
    this.http.put('https://localhost:44346/api/book/ChangeBookDiscount/', discount).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.success('Update Discount Successfully :)')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    });
  }
  deleteBook(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44346/api/book/DeleteBook/' + id).subscribe((res) => {
      this.spinner.hide();
      this.toastr.warning('Delete Book Successfully :)')
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status)
    })
  }

  getAllComment(id:number) {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Comment/'+id).subscribe((res) => {
      this.data = res;
      this.spinner.hide();
      this.toastr.success('Comments Retrieved');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }

  createComment(body:any){
    this.spinner.show;
    this.http.post('https://localhost:44346/api/Comment/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('Create Comment Successfully :)');
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })

  }

  updateComment(body:any){
    this.spinner.show;
    this.http.put('https://localhost:44346/api/Comment/',body).subscribe((res)=>{
      this.spinner.hide;
     this.toastr.success('updated Successfully :)') ;
 
    },err=>{
     this.spinner.hide;
     this.toastr.error(err.message , err.status)
 
    })
    
   }


   deleteComment(id:number){
    this.http.delete('https://localhost:44346/api/Comment/delete/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
    },err=>{
      this.toastr.error(err.message,err.status)
    })

  }


  createRecomment(body:any){
    this.spinner.show;
    this.http.post('https://localhost:44346/api/Recomment/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('Create Recomment Successfully :)');
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })

  }


  updateRecomment(body:any){
    this.spinner.show;
    this.http.put('https://localhost:44346/api/Recomment/',body).subscribe((res)=>{
      this.spinner.hide;
     this.toastr.success('updated Successfully :)') ;
 
    },err=>{
     this.spinner.hide;
     this.toastr.error(err.message , err.status)
 
    })
    
   }


   deleteRecomment(id:number){
    this.http.delete('https://localhost:44346/api/Recomment/delete/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
    },err=>{
      this.toastr.error(err.message,err.status)
    })

  }


  getAllRecomment(id:number) {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Recomment/'+id).subscribe((res) => {
      this.data1 = res;
      this.spinner.hide();
      this.toastr.success('Recomments Retrieved');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }




}
