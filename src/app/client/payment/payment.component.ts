import { AuthService } from 'src/app/Services/auth.service';
import { LoaningService } from './../../Services/loaning.service';
import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/book.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  end_Date = new FormControl('',Validators.required);
  startDate = new Date(new Date().setDate(new Date().getDate() + 3))
  constructor(public bookservice:BookService,private route:Router,private loanService:LoaningService,private userService:AuthService) {
   }
   btnNextPrev = {
    prev: true,
    next: false,
    index: 0
}
  state : number = 0;
  ngOnInit(): void {
    if(!this.bookservice.book){
        this.route.navigate(['/books'])
    }
  }
  submit(){
    const loan ={
      book_Id:this.bookservice.book.id,
      student_Id:this.userService.user.id,
      price:this.bookservice.book.price,
      book_Name:this.bookservice.book.book_Name,
      student_Name:this.userService.user.first_Name + " "+this.userService.user.last_Name,
      end_Date:new Date(this.end_Date.value.setDate(this.end_Date.value.getDate() + 1))
    }
    this.loanService.createLoan(loan);
    this.route.navigate([''])
    location.reload();
  }
  navig(n:any) {
    switch (n) {
      case 'next': {
        this.btnNextPrev.index++
        if (this.btnNextPrev.index > 3) {
          this.btnNextPrev.prev = false
          this.btnNextPrev.next = true
        } else {
          this.btnNextPrev.prev = false
        }
      }; break;
      case 'prev': {
        this.btnNextPrev.index--
        if (this.btnNextPrev.index == 0) {
          this.btnNextPrev.prev = true
          this.btnNextPrev.next = false
        } else {
          this.btnNextPrev.next = false
        }
      }; break;

    }
  }
}
