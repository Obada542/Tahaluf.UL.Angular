import { AuthService } from 'src/app/Services/auth.service';
import { LoaningService } from './Services/loaning.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastr:ToastrService,private borrowings:LoaningService,private user:AuthService){
    this.toastr.success("Welcome");
    if(localStorage.getItem("user")){
      // this.borrowings.getStudentLoans(this.user.getUser().unique_name)
      this.user.getUser();
    }
  }
}
