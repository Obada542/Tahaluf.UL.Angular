import { BookService } from './../../Services/book.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  p:number = 1;
  pageSize:number=8;
  constructor(public bookService:BookService) { }

  ngOnInit(): void {

  }
  getRate(id:number){
    if(this.bookService.rates){
      const rate =this.bookService.rates.find((x:any) => x.book_Id ==id);
      return rate.rate
    }

  }
  changeSize(page:any){
    this.pageSize=page.target.value
  }
}
