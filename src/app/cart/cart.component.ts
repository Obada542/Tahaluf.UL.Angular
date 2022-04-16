import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { BookService } from '../Services/book.service';
import { LoaningService } from '../Services/loaning.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  products:any=[];
  total:number=0;
  sumTotal:any=[];
  cartNum:number=0;
 
  constructor( public auth:AuthService,public bookService: BookService, public loanService: LoaningService,private route:Router) { }

  ngOnInit(): void {
    this.cartDetails();
    this. getTotal();
   
  }

  cartDetails(){
    if (localStorage.getItem("Cart")){
      this.products=JSON.parse(localStorage.getItem("Cart")|| '{}')
    }

  }

  getTotal(){
    if (localStorage.getItem("Cart")){
      this.sumTotal=JSON.parse(localStorage.getItem("Cart")|| '{}');
      this.total = this.sumTotal.reduce(function(acc:any,val:any)
      {
        return acc + val.price;
      },0)
    }
  }

  deleteAll(){
    localStorage.removeItem("Cart");
    this.products=[];
    this.total= 0;
   this.cartNum=0;
   this.auth.CartSubject.next(this.cartNum);
    location.reload();

  }

  delete(id:number){
    if (localStorage.getItem("Cart")){
      this.products=JSON.parse(localStorage.getItem("Cart")|| '{}');

      for(let i= 0; i< this.products.length;i++){
        if(this.products[i].id == id){
          this.products.splice(i,1);

          localStorage.setItem("Cart",JSON.stringify(this.products));

          this.getTotal();
          this.cartNumber();

        }
      }
    }



  }

  cartNumber(){
    var cartValue = JSON.parse(localStorage.getItem("Cart")|| '{}');
    this.cartNum= cartValue.length;
    this.auth.CartSubject.next(this.cartNum);
  }

  borrow(id:number){
    this.bookService.getBookById(id);
    setTimeout(()=>{
      this.route.navigate(['/client/payment']);

    },1000)
  }



  

}
