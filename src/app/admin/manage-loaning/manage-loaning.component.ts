import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from './../../Services/book.service';
import { MatDialog, } from '@angular/material/dialog';
import { LoaningService } from './../../Services/loaning.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-loaning',
  templateUrl: './manage-loaning.component.html',
  styleUrls: ['./manage-loaning.component.css']
})
export class ManageLoaningComponent implements OnInit {
  @ViewChild("change") change!: TemplateRef<any>;
  @ViewChild("searchInterval") searchInterval!: TemplateRef<any>;

  serachDates: FormGroup= new FormGroup({
    start_Date :new FormControl(Date,[Validators.required]),
    end_Date :new FormControl(Date,[Validators.required])
  });

  selectedLoan: any={
    id: 0,
    isloaned: '',
    fines: 0
  };
  constructor(public loanService:LoaningService,private dialog:MatDialog,public bookService:BookService) { }


  loans: Array<any> = [];

  ngOnInit(): void {
    this.bookService.getAllBooks();
    this.loanService.getAllLoans();
  }
  openChangeStatus(loan:any){
    this.selectedLoan.id = loan.id;
    this.selectedLoan.isloaned = 'false';
    this.selectedLoan.fines = loan.fines;
    this.dialog.open(this.change);
  }
  changeStatus(){
    this.loanService.updateLoan(this.selectedLoan);
    location.reload();
  }
  getBookName(id:number){
    if(this.bookService.books.length > 0)
      return this.bookService.books.find((x:any)=>x.id==id).book_Name;
  }
  searchLoans(event: any) {
    let searchloans: Array<any> = [];
    for (let i = 0; i < this.loanService.loans.length; i++) {
      const loan: string = this.getBookName(this.loanService.loans[i].book_Id).toLowerCase();
      if (loan.includes(event.target.value.toLowerCase())) {
        searchloans.push(this.loanService.loans[i]);
      }
    }
    this.loans = searchloans;
  }
  openSearchUsingDate(){
    this.dialog.open(this.searchInterval);
  }
  searchByDates(){
    this.loanService.searchByDates(this.serachDates.value)
  }
}
