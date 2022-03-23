import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoaningService {
  loans: any =[];
  constructor(public datepipe: DatePipe,private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) { }
  getAllLoans(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/loaning/").subscribe(res=>{
    this.spinner.hide();
    this.toastr.success("Loan Data Retrieved!!");
    this.loans = res;
    console.log(res)
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  updateLoan(data:any){
    this.spinner.show();
    this.http.put("https://localhost:44346/api/loaning/",data).subscribe(res=>{
    this.spinner.hide();
    this.toastr.success("Loan updated successfully!!");
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  searchByDates(data:any){
    this.spinner.show();
    data.start_Date=this.datepipe.transform(data.start_Date, 'dd-MMMM-yyyy');
    data.end_Date=this.datepipe.transform(data.end_Date, 'dd-MMMM-yyyy');
    this.http.post("https://localhost:44346/api/loaning/SearchInterval/",data).subscribe(res=>{
    this.spinner.hide();
    this.loans = res;
    this.toastr.success("search successfully!!");
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
}
