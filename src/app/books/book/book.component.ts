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
  pageSize:number=1;
  constructor(public bookService:BookService) { }

  ngOnInit(): void {

  }

}
