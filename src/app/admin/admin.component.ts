import { LoaningService } from './../Services/loaning.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {

  constructor(private loanService:LoaningService,private cookieService:CookieService) { }


  ngOnInit(): void {
      //this.loanService.sendLateFeesMessage();
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
  logout(){
    localStorage.clear();
    setTimeout(()=>{
      location.reload()
    },1500)

  }
}
