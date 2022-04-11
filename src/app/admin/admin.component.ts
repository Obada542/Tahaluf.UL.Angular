import { LoaningService } from './../Services/loaning.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {

  constructor(private loanService:LoaningService) { }


  ngOnInit(): void {
    this.loanService.sendLateFeesMessage();
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
