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
    this.bookService.getBestBooks();
    this.sliderService.getAll();
    this.bookService.getNewestBooks();
  }

  SearchByCategory(category:string){
  }
  OpenBookDetails(id:number){
  }
}
