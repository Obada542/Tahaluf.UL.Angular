import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, } from '@angular/material/dialog';
import { LoaningService } from './../../Services/loaning.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-manage-loaning',
  templateUrl: './manage-loaning.component.html',
  styleUrls: ['./manage-loaning.component.css']
})
export class ManageLoaningComponent implements OnInit {
  @ViewChild("change") change!: TemplateRef<any>;
  @ViewChild("searchInterval") searchInterval!: TemplateRef<any>;

  serachDates: FormGroup= new FormGroup({
    start_Date :new FormControl([Validators.required]),
    end_Date :new FormControl([Validators.required])
  });

  selectedLoan: any={
    id: 0,
    isloaned: '',
    fines: 0
  };
  constructor(public loanService:LoaningService,private dialog:MatDialog) { }

  loans: Array<any> = [];

  ngOnInit(): void {
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

  searchLoans(event: any) {
    let searchloans: Array<any> = [];
    for (let i = 0; i < this.loanService.loans.length; i++) {
      const book: string = this.loanService.loans[i].book_Name.toLowerCase();
      const student: string = this.loanService.loans[i].student_Name.toLowerCase();
      if (book.includes(event.target.value.toLowerCase()) || student.includes(event.target.value.toLowerCase())) {
        searchloans.push(this.loanService.loans[i]);
      }
    }
    this.loans = searchloans;
  }
  openSearchUsingDate(){
    this.dialog.open(this.searchInterval);
  }
  searchByDates(){
    this.loans =[]
    this.loanService.searchByDates(this.serachDates.value);
  }
  downloadAsPdf(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table' ,columns:['Loan Id','Book Name','Student Name','Price','Start Date','End Date','Fines','Status']});
    doc.save('LoaningReport.pdf');
  }
  exportexcel(){
    const fileName= 'LoaningReport.xlsx';
     let element = document.getElementById('table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     for(var i = 1;i<=this.loanService.loans.length+1;i++){
        if(ws['I'+i]){
          delete(ws['I'+i]);
        }else{
          break;
        }
     }
     
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     XLSX.writeFile(wb,fileName);
  }
}
