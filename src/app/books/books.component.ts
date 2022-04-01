import { BookService } from './../Services/book.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  pageOfItems!: Array<any>;
  p: number = 1;
  pageSize: number = 1;
  constructor(public bookService: BookService) { }

  ngOnInit() {
    this.bookService.getAvailableBook();

  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    document.documentElement.scrollTop = 500;
  }

}
