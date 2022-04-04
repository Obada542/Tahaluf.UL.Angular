import { BookService } from 'src/app/Services/book.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastr:ToastrService,private router:Router,private user:AuthService,private bookService:BookService){
    this.toastr.success("Welcome");
    setTimeout(() => {
    this.bookService.getAllRates();
    }, 3000);
    setTimeout(() => {
      this.bookService.getAllLibraries();
    }, 5000);
    setTimeout(() => {
      this.bookService.getCategories();
    }, 7000);

    if(localStorage.getItem("user")){
      this.user.getUser();
      if(this.user.user.role =="Admin"){
        const url:string =window.location.href
       if(!url.includes('admin')){
        this.router.navigate(['admin'])
       }
      }
      if(this.user.user.role =="Accountant"){
        const url:string =window.location.href
       if(!url.includes('accountant')){
        this.router.navigate(['accountant'])
       }
      }
    }
  }
}
