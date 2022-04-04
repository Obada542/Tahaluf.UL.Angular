import { StudentService } from './../../Services/student.service';
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookService } from 'src/app/Services/book.service';
import { Subscription } from 'rxjs';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  totalPages: any;
  @ViewChild('page') page!: TemplateRef<any>;
  @ViewChild('rating') rating!: TemplateRef<any>;

  currentpage!: number;
  checkUser = false;
  more = 3;
  error!: string;
  unavailable: boolean = false;


  rateForm = new FormGroup({
    rate: new FormControl(2.5, [Validators.required, Validators.min(0), Validators.max(5)]),
    review: new FormControl('', [Validators.required]),
    book_Id: new FormControl(),
    student_Id: new FormControl(),
  })
  constructor(public bookService: BookService,
    private route: ActivatedRoute, private dialog: MatDialog, private userService: AuthService, private studentService: StudentService) {

  }

  ngOnInit(): void {

    var id: any;
    this.subscription = this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.bookService.getBookById(id);
    setTimeout(() => {
      this.studentService.getAllStudents();

    }, 1200)
    setTimeout(() => {
      this.bookService.searchBook(this.bookService.book.category);
    }, 3200)
    if (localStorage.getItem("user")) {
      this.checkUser = true
    }

  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
  libraryname(id: number) {
    if (this.bookService.libraries)
      return this.bookService.libraries.find((x: any) => x.id == id).library_Name;
  }
  getPages(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
    const book = this.bookService.books.find((x: any) => x.id == this.bookService.book.id);
    if (book == null) {
      this.unavailable = true;
    }
  }
  openPage(page: number) {
    this.currentpage = page;
    this.dialog.open(this.page);
  }
  openRate() {
    if(localStorage.getItem("user") === null){
      this.error = "Please login first.";
      return
    }
    var user = this.bookService.bookRates.find((x: any) => x.student_Id == this.userService.user.id);

    if (user) {
      this.error = " You already rate this book";
      return
    }

    this.dialog.open(this.rating);
  }
  getRate(id: number) {
    if (this.bookService.rates) {
      const rate = this.bookService.rates.find((x: any) => x.book_Id == id);
      return rate.rate
    }

  }
  submitReview() {

    this.rateForm.controls['book_Id'].setValue(this.bookService.book.id)
    this.rateForm.controls['student_Id'].setValue(this.userService.user.id)
    this.bookService.submitRate(this.rateForm.value)
  }
  getStudentImage(id: number) {
    if (this.studentService.login) {
      const student = this.studentService.students.find((x: any) => x.id == id);
      return this.studentService.login.find((x: any) => x.id == student.login_Id).image;
    }
  }
  getStudentName(id: number) {
    if (this.studentService.login) {
      const name = this.studentService.students.find((x: any) => x.id == id).first_Name + ' ' + this.studentService.students.find((x: any) => x.id == id).last_Name;
      return name;
    }
    return
  }
  calculateDiff(date: any) {
    let currentDate = new Date();
    date = new Date(date);

    const time = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) / (1000 * 60 * 60 * 24));
    if (time < 1) {
      return ("Today")
    }
    else if (time <= 29) {
      return (time + " day ago")
    } else if (time <= 365) {
      return (Math.round(time / 30) + " month ago")
    } else {
      return (time / 365 + " year ago")
    }
  }
}
