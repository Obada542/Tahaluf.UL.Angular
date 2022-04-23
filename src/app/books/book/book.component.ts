import { BookService } from './../../Services/book.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { LoaningService } from 'src/app/Services/loaning.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  p:number = 1;
  array!: Array<any>;
  pageSize:number=8;
  itemsCart:any=[];
  cartNum:number=0;
  error!: string;
  error2!: string;
  error3!: string;
  constructor(public bookService:BookService, public auth:AuthService,private loanService: LoaningService,private toastr: ToastrService) { }

  ngOnInit(): void {


  }
  getRate(id:number){
    if(this.bookService.rates){
      const rate =this.bookService.rates.find((x:any) => x.book_Id ==id);
      if(rate)
        return rate.rate
      else return false
    }

  }
  changeSize(page:any){
    this.pageSize=page.target.value
  }
  sortBooks(){
    this.array.sort()
  }

  addToCart(item:any){

    var user = this.loanService.studentloans.find((x: any) => x.book_Id == item.id && x.isloaned == "true");
    var book = this.bookService.availableBooks.find((x: any) => x.id == item.id);
    if (user || book==null) {
      if(user)
      // this.error2 = "You have already borrowed this book";
      this.toastr.error("You have already borrowed this book");
      if(book==null)
      // this.error3 = " This book is not available now";
      this.toastr.error("This book is not available now");
      return
    }


    // var book = this.bookService.availableBooks.find((x: any) => x.id == item.id);

    // if (book==null) {
    //   this.error3 = " This book is not available now";
    //   return
    // }




    if (localStorage.getItem("user") === null) {
      this.error = "Please login first.";
      return
    }



    let cartDataNull= localStorage.getItem("Cart");

    if(cartDataNull==null){

      let StoreData:any=[];
      StoreData.push(item);
      localStorage.setItem("Cart",JSON.stringify(StoreData));
    }

    else{

      var id = item.id;
      let index:number= -1;

      this.itemsCart=JSON.parse(localStorage.getItem("Cart")|| '{}');

      for(let i=0 ; i< this.itemsCart.length ; i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].id)){
          index= i ;
          break
        }
      }

      if(index == -1){
        this.itemsCart.push(item);
        localStorage.setItem("Cart", JSON.stringify(this.itemsCart));
      }

      else{
        localStorage.setItem("Cart", JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumber();

  }

  cartNumber(){
    var cartValue = JSON.parse(localStorage.getItem("Cart")|| '{}');
    this.cartNum= cartValue.length;
    this.auth.CartSubject.next(this.cartNum);
  }


  unavailable(id:any) {
    if (this.bookService.availableBooks) {
      const book = this.bookService.availableBooks.find((x: any) => x.id == id);
      if (book == null) {
        return true;
      }
      else {
        return false
      }
    }
    return
  }





}
