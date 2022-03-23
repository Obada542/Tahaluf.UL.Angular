import { StudentService } from './../../Services/student.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from './../../Services/book.service';
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
  constructor(public loanService:LoaningService,private studentService:StudentService,private dialog:MatDialog,public bookService:BookService) { }


  loans: Array<any> = [];

  ngOnInit(): void {
    this.bookService.getAllBooks();
    this.loanService.getAllLoans();
    this.studentService.getAllStudents();
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
    if(this.bookService.books){
      return this.bookService.books.find((x:any)=>x.id==id).book_Name;
    }
  }
  getStudentName(id:number){
      if(!this.studentService.students){
        return ""
      }
      var name:string = this.studentService.students.find((x:any)=>x.id==id).first_Name + ' '+this.studentService.students.find((x:any)=>x.id==id).last_Name;
      return name;
  }
  searchLoans(event: any) {
    let searchloans: Array<any> = [];
    for (let i = 0; i < this.loanService.loans.length; i++) {
      const book: string = this.getBookName(this.loanService.loans[i].book_Id).toLowerCase();
      const student: string = this.getStudentName(this.loanService.loans[i].student_Id).toLowerCase();
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
    autoTable(doc, { html: '#table' ,columns:['Book Name','Student Name','Start Date','End Date','Fines','Status']});
    doc.save('LoaningReport.pdf');
  }
  exportexcel(){
    const fileName= 'LoaningReport.xlsx';
     let element = document.getElementById('table');
     const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
     for(var i = 1;i<=this.loanService.loans.length+1;i++){
        if(ws['G'+i]){
          delete(ws['G'+i]);
        }else{
          break;
        }
     }
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
     XLSX.writeFile(wb,fileName);
  }
}
