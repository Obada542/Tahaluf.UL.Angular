import { BookService } from './../Services/book.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  pageOfItems!: Array<any>;
  p: number = 1;
  pageSize: number = 1;
  constructor(public bookService: BookService,private router: Router) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    if(!this.bookService.empty){
      this.bookService.getAllBooks();
      this.bookService.empty = true;
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    document.documentElement.scrollTop = 500;
  }

}
