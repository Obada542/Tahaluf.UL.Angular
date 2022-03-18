import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  pageOfItems!: Array<any>;
  items:any;
  constructor() { }

  ngOnInit() {
    this.items = Array(100).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
}

onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
    document.documentElement.scrollTop = 600;
  }
}
