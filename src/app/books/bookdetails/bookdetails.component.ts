import { LoaningService } from './../../Services/loaning.service';
import { StudentService } from './../../Services/student.service';
import { AuthService } from 'src/app/Services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BookService } from 'src/app/Services/book.service';
import { Subscription } from 'rxjs';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

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
  @ViewChild('updateComment') updateComment!: TemplateRef<any>;
  @ViewChild('deleteComment') deleteComment!: TemplateRef<any>;
  @ViewChild('updateRecomment') updateRecomment!: TemplateRef<any>;
  @ViewChild('createRecomment') createRecomment!: TemplateRef<any>;
  @ViewChild('deleteRecomment') deleteRecomment!: TemplateRef<any>;

  currentpage!: number;
  checkUser = false;
  more = 3;
  error!: string;
  error2!: string;

  selectedComment: any;
  selectedRecomment: any;
  idC: any;
  idRc: any;
  rateForm = new FormGroup({
    rate: new FormControl(2.5, [Validators.required, Validators.min(0), Validators.max(5)]),
    review: new FormControl('', [Validators.required]),
    book_Id: new FormControl(),
    student_Id: new FormControl(),
  })
  commentForm: FormGroup = new FormGroup({
    student_Comment: new FormControl(['']),
    postdate: new FormControl(),
    student_Id: new FormControl(),
    book_Id: new FormControl(),
  });
  commentUpdate: FormGroup = new FormGroup({
    id: new FormControl(''),
    student_Comment: new FormControl(['']),
    postdate: new FormControl(),
    student_Id: new FormControl(),
    book_Id: new FormControl()
  });
  RecommentForm: FormGroup = new FormGroup({
    student_Comment: new FormControl(['']),
    postdate: new FormControl(),
    student_Id: new FormControl(),
    book_Id: new FormControl(),
    comment_Id: new FormControl()
  });

  RecommentUpdate: FormGroup = new FormGroup({
    id: new FormControl(''),
    student_Comment: new FormControl(['']),
    postdate: new FormControl(),
    student_Id: new FormControl(),
    book_Id: new FormControl(),
    comment_Id: new FormControl()
  });

  constructor(public bookService: BookService, public router: Router,
    private route: ActivatedRoute, private dialog: MatDialog, public userService: AuthService, private studentService: StudentService, private loanService: LoaningService) {
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
  }
  openPage(page: number) {
    this.currentpage = page;
    this.dialog.open(this.page);
  }
  borrow() {
    var user = this.loanService.studentloans.find((x: any) => x.book_Id == this.bookService.book.id && x.isloaned == "true");
    if (user) {
      this.error2 = "You have already borrowed this book";
      return
    }
    this.router.navigate(['/client/payment'])
  }
  openRate() {
    if (localStorage.getItem("user") === null) {
      this.error = "Please login first.";
      return
    }
    var user = this.bookService.bookRates.find((x: any) => x.student_Id == this.userService.user.id);

    if (user) {
      this.error = " You have already rated this book";
      return
    }

    this.dialog.open(this.rating);
  }
  getRate(id: number) {
    if (this.bookService.rates) {
      const rate = this.bookService.rates.find((x: any) => x.book_Id == id);
      if (rate)
        return rate
      else return false
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
  unavailable() {
    if (this.bookService.availableBooks) {
      const book = this.bookService.availableBooks.find((x: any) => x.id == this.bookService.book.id);
      if (book == null) {
        return true;
      }
      else {
        return false
      }
    }
    return
  }

  onSubmit() {
    this.commentForm.controls['book_Id'].setValue(this.bookService.book.id)
    this.commentForm.controls['student_Id'].setValue(this.userService.user.id)

    this.bookService.createComment(this.commentForm.value);

    location.reload();

  }

  openCreateDialog(id: number) {
    this.idC = id;
    this.dialog.open(this.createRecomment);
  }
  openUpdateDialog(comment: any) {
    this.selectedComment = comment;
    this.commentUpdate.controls['id'].setValue(comment.id);
    this.commentUpdate.controls['student_Id'].setValue(comment.student_Id);
    this.commentUpdate.controls['book_Id'].setValue(comment.book_Id);
    this.commentUpdate.controls['postdate'].setValue(comment.postdate);

    this.dialog.open(this.updateComment);
  }
  openDeleteDialog(id: number) {
    this.idC = id;
    this.dialog.open(this.deleteComment);
  }
  update() {
    this.bookService.updateComment(this.commentUpdate.value);
    location.reload();
  }

  delete() {
    this.bookService.deleteComment(this.idC);
    location.reload();
  }

  recommentSubmit() {
    this.RecommentForm.controls['book_Id'].setValue(this.bookService.book.id)
    this.RecommentForm.controls['student_Id'].setValue(this.userService.user.id)
    this.RecommentForm.controls['comment_Id'].setValue(this.idC)
    this.bookService.createRecomment(this.RecommentForm.value);
    location.reload();

  }

  UpdateDialogRecomment(Recomment: any) {
    this.selectedRecomment = Recomment;
    this.RecommentUpdate.controls['id'].setValue(Recomment.id);
    this.RecommentUpdate.controls['student_Id'].setValue(Recomment.student_Id);
    this.RecommentUpdate.controls['book_Id'].setValue(Recomment.book_Id);
    this.RecommentUpdate.controls['comment_Id'].setValue(Recomment.comment_Id);
    this.dialog.open(this.updateRecomment);
  }

  DeleteDialogRecomment(id: number) {
    this.idRc = id;
    this.dialog.open(this.deleteRecomment);
  }

  updateRecomments() {
    this.bookService.updateRecomment(this.RecommentUpdate.value);
    location.reload();
  }

  deleteRecomments() {
    this.bookService.deleteRecomment(this.idRc);
    location.reload();
  }
}
