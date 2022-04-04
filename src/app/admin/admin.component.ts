import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {

  constructor(private route:Router) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
  logout(){
    localStorage.clear();
    setTimeout(()=>{
      this.route.navigate([''])
      location.reload()
    },1500)

  }
}
