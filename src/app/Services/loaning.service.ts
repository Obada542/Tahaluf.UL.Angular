import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaningService {
  loans: any;
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) { }
  getAllLoans(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/loaning/").subscribe(res=>{
    this.spinner.hide();
    this.toastr.success("Loan Data Retrieved!!");
    this.loans = res;
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
    this.http.get("https://localhost:44346/api/loaning/SearchInterval",data).subscribe(res=>{
    this.spinner.hide();
    this.loans = res;
    this.toastr.success("search successfully!!");
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
}
