import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.css']
})
export class AccountantComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear();
    setTimeout(()=>{
      location.reload()
    },1500)

  }
}
