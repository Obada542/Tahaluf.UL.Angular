import { HomeService } from './../Services/home.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../Services/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public bookService: BookService, public sliderService: HomeService) {

  }
  ngOnInit() {
    this.sliderService.getAll();

    setTimeout(()=>{
    this.bookService.getBestBooks();
      },3000);

  }
  getRate(id:number){
    if(this.bookService.rates){
      const rate =this.bookService.rates.find((x:any) => x.book_Id ==id);
      return rate.rate
    }

  }
  SearchByCategory(category:string){
  }
  OpenBookDetails(id:number){
  }
}
