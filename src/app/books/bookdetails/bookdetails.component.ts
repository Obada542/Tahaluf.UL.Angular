import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/app/Services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit ,OnDestroy{
  private subscription!: Subscription;

  constructor(public book:BookService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    var id:any;
    this.route.params.subscribe(params => {
        id=params['id'];
    });
    console.log(id)
    this.book.getBookById(id);
  }
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
}
