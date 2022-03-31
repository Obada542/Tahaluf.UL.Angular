import { LoaningService } from './../../Services/loaning.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public userService:AuthService,public loanService:LoaningService) { }

  ngOnInit(): void {

  }

}
