import { Component, OnInit } from '@angular/core';
import { LoaningService } from 'src/app/Services/loaning.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  constructor(public loans:LoaningService) { }

  ngOnInit(): void {
  }

}
