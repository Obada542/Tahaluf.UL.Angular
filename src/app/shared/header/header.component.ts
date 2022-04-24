import { BookService } from 'src/app/Services/book.service';
import { LoaningService } from './../../Services/loaning.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from 'src/app/Services/student.service';
import { WebsitePartsService } from 'src/app/Services/website-parts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  locations:any=[];
  totalItem:number=0;
  @ViewChild("map") map!:TemplateRef<any>;
  constructor(private dialog:MatDialog,private route:Router,public userService:AuthService,public loanService:LoaningService,public bookService:BookService,private spinner:NgxSpinnerService,public website : WebsitePartsService,public studentService:StudentService) {
    this.userService.CartSubject.subscribe((data)=>{
      this.totalItem= data
    })
  }

  ngOnInit(): void {
    this.cartItem();
    this.website.getHeader();

  }

  cartItem(){
    if (localStorage.getItem("Cart") != null){
      let data = JSON.parse(localStorage.getItem("Cart")|| '{}');
      this.totalItem= data.length;
    }
   }
  serchBook(search:any){
    this.bookService.searchBook(search.toLowerCase())
    this.route.navigate(['/books'])
  }
  logout(){
    localStorage.clear();
    this.spinner.show()
    this.route.navigate([''])
    setTimeout(() => {
      location.reload()
      this.spinner.hide()
    }, 1500);
  }
  openMap(){
    for(var i = 0;i<this.bookService.libraries.length;i++){
      const loca = this.bookService.libraries[i].location.split(",")
      this.locations.push({
        id:this.bookService.libraries[i].id,
        name:this.bookService.libraries[i].library_Name,
        address:loca[0],
        lat:loca[1],
        lng:loca[2]
      })
    }
    this.dialog.open(this.map);
  }
  markerClicked(location:any){
    this.bookService.getBooksByLibrary(location.name)
    this.dialog.closeAll();
      this.route.navigate(['/books'])
  }
  fines(){
    if(this.loanService.studentloans){
      const sum =this.loanService.studentloans.reduce((sum:any, obj:any) => {
        return sum + obj.fines;
      }, 0);

    return Math.round(sum * 100) / 100;
    }
    return '';
  }
}
