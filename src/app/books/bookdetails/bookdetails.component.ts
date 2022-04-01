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
  checkUser=false;
  more = 3;
  error!:string;
  rateForm=new FormGroup({
    rate:new FormControl(2.5,[Validators.required,Validators.min(0),Validators.max(5)]),
    review:new FormControl('',[Validators.required]),
    book_Id:new FormControl(),
    student_Id:new FormControl(),
  })
  constructor(public book: BookService, private router: Router,
     private route: ActivatedRoute, private dialog: MatDialog,private toster:ToastrService,private userService:AuthService,private studentService:StudentService) {

  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    var id: any;
    this.subscription = this.route.params.subscribe(params => {
      id = params['id'];
    });
      this.book.getBookById(id);
      setTimeout(()=>{
        this.studentService.getAllStudents();

      },1000)

    if(localStorage.getItem("user")){
      this.checkUser = true
    }
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
  libraryname(id: number) {
    if (this.book.libraries)
      return this.book.libraries.find((x: any) => x.id == id).library_Name;
  }
  getPages(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
  }
  openPage(page: number) {
    this.currentpage = page;
    this.dialog.open(this.page);
  }
  openRate(){
    const user = this.book.bookRates.find((x:any)=>x.student_Id == this.userService.user.id);
    if(user){
      this.error =" You already rate this book";
      return
    }
    this.dialog.open(this.rating);
  }
  getRate(id:number){
    if(this.book.rates){
      const rate =this.book.rates.find((x:any) => x.book_Id ==id);
      return rate.rate
    }

  }
  submitReview(){

    if(!localStorage.getItem("user")){
      this.toster.warning("Please Login first.");
      setTimeout(()=>{
        this.router.navigate(['/security/login'])

      },1000)
    }
    this.rateForm.controls['book_Id'].setValue(this.book.book.id)
    this.rateForm.controls['student_Id'].setValue(this.userService.user.id)
    console.log(this.rateForm.value)
    this.book.submitRate(this.rateForm.value)
  }
  getStudentImage(id:number){
    if(this.studentService.login){
      const student = this.studentService.students.find((x:any)=>x.id == id);
      return this.studentService.login.find((x:any)=>x.id ==student.login_Id).image;
    }
  }
  getStudentName(id:number){
    if(this.studentService.login){
      const name = this.studentService.students.find((x:any)=>x.id == id).first_Name +' ' +this.studentService.students.find((x:any)=>x.id == id).last_Name;
      return name;
    }
    return
  }
  calculateDiff(date:any){
    let currentDate = new Date();
    date = new Date(date);

    const time = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) ) /(1000 * 60 * 60 * 24));
    if(time <=29){
      return (time+" days ago")
    }else if(time <=365){
      return (Math.round(time/30)+" months ago")
    }else {
      return (time/365+" years ago")
    }
}
}
