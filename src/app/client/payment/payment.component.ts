import { Router } from '@angular/router';
import { BookService } from 'src/app/Services/book.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  startDate = new FormControl({value: new Date(), disabled: true});
  constructor(public bookservice:BookService,private route:Router) {
   }
  state : number = 0;
  ngOnInit(): void {
    if(!this.bookservice.book){
        this.route.navigate(['/books'])
    }
  }
}
