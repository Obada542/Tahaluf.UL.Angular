import { BookService } from './../../Services/book.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  p:number = 1;
  array!: Array<any>;
  pageSize:number=8;
  constructor(public bookService:BookService) { }

  ngOnInit(): void {

  }
  getRate(id:number){
    if(this.bookService.rates){
      const rate =this.bookService.rates.find((x:any) => x.book_Id ==id);
      if(rate)
        return rate.rate
      else return false
    }

  }
  changeSize(page:any){
    this.pageSize=page.target.value
  }
  sortBooks(){
    this.array.sort()
  }
}
