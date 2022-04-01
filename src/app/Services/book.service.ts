import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  pdf: any;
  display_Image: any;
  books: any;
  book: any;
  libraries: any;
  newestBooks: any;
  categories: any;
  rates:any;
  bookRates:any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  getAllBooks() {
    this.spinner.show();

    this.http.get('https://localhost:44346/api/book/GetBooks').subscribe((res) => {
      this.books = res;
      this.spinner.hide();
    }, err => {
      this.toastr.error(err.message, err.status);
    });
    setTimeout(() => {
      this.getAllLibraries();

    }, 1300);
    setTimeout(() => {
      this.getAllRates();
      this.spinner.hide();
    }, 1300);
  }
  getBookById(id: any) {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/book/GetBookById/' + id).subscribe((res) => {
      this.book = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
    setTimeout(() => {
      this.getAllLibraries();
    }, 1000);
    setTimeout(() => {
      this.getRatesByBook(id);
      this.spinner.hide();
    }, 2000);
  }

  getBestBooks() {
    this.spinner.show();

    this.http.get('https://localhost:44346/api/book/getbestbooks').subscribe((res) => {
      this.books = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
    setTimeout(() => {
      this.getAllRates();
    }, 1000);
    setTimeout(() => {
      this.getNewestBooks();
      this.spinner.hide();
    }, 1300);
  }

  getNewestBooks() {
    return this.http.get('https://localhost:44346/api/book/GetNewestBooks').subscribe((res) => {
      this.newestBooks = res;
    }, err => {
      this.toastr.error(err.message, err.status);
    });
  }

  getAvailableBook() {
    this.spinner.show();

    this.http.get('https://localhost:44346/api/book/GetAvailableBook').subscribe((res) => {
      this.books = res;
    }, err => {
      this.toastr.error("Sorry we facing some issuse with data");
    });
    setTimeout(() => {
      this.getAllRates();
    }, 1300);
    setTimeout(() => {
      this.getCategories();
      this.spinner.hide();
    }, 2000);
  }

  getAllLibraries() {
    this.http.get('https://localhost:44346/api/library/GetLibraries').subscribe((res) => {
      this.libraries = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }

  getCategories() {
    this.http.get('https://localhost:44346/api/book/getCategories').subscribe((res) => {
      this.categories = res;
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
    return this.http.get('https://localhost:44346/api/rating').subscribe((res) => {
      this.rates = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getRatesByBook(id:number) {
    this.http.get('https://localhost:44346/api/rating/'+id).subscribe((res) => {
      this.bookRates = res;
      console.log(res)
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  submitRate(review:any) {
    this.spinner.show()
    console.log(review)
    this.http.post('https://localhost:44346/api/rating',review).subscribe((res) => {
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
}
