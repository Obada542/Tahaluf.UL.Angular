import { Router } from '@angular/router';
import { HomeService } from './../Services/home.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../Services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public bookService: BookService, public sliderService: HomeService,private route:Router) {

  }
  ngOnInit() {
    this.sliderService.getAll();
    document.body.scrollTop = 0;
    setTimeout(()=>{
    this.bookService.getBestBooks();
      },1500);

  }
  getRate(id:number){
    if(this.bookService.rates){
      const rate =this.bookService.rates.find((x:any) => x.book_Id ==id);
      if(rate)
        return rate.rate
      else return false
    }

  }
  borrow(id:number){
    this.bookService.getBookById(id);
    setTimeout(()=>{
      this.route.navigate(['/client/payment']);

    },1000)
  }
}
