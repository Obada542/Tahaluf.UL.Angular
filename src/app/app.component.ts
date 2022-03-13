import { NavigationEnd, NavigationStart, Router,Event } from '@angular/router';
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tahaluf.UL.Angular';
  showSpinner = true;
  constructor(private router:Router){
    this.router.events.subscribe((routerEvent: Event)=>{
      if(routerEvent instanceof NavigationStart){
        this.showSpinner = true;
      }
      if(routerEvent instanceof NavigationEnd){
        this.showSpinner = false;
      }
    });
  }
}
