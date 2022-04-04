import { FormControl } from '@angular/forms';
import { BookService } from 'src/app/Services/book.service';
import { LoaningService } from './../../Services/loaning.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  locations:any=[]
  @ViewChild("map") map!:TemplateRef<any>;
  constructor(private dialog:MatDialog,private route:Router,public userService:AuthService,public loanService:LoaningService,public bookService:BookService) { }

  ngOnInit(): void {
  }
  serchBook(search:any = ''){
    this.bookService.search = search
    this.route.navigate(['/books'])
  }
  logout(){
    localStorage.clear();
    location.reload()
    this.route.navigate([''])
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
    this.bookService.library = location.name;
    this.dialog.closeAll();
      this.route.navigate(['/books'])
  }
}
