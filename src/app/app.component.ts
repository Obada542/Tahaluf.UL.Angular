import {  NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tahaluf.UL.Angular';
  constructor(private toastr:ToastrService,private spinner: NgxSpinnerService){
    this.toastr.success("Welcome");
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide();
    },3000)
  }
}
