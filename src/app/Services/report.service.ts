import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  report: any =[];
  staitstics:any =[];
  newUsers:any;
  salaries:any = [];
  totalOrders:any;
  totalFines:any;
  totalSales:any;
  totlatSalary:any;
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) {}

  getAnnualReports(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/AnnualReport").subscribe(res=>{
      this.spinner.hide();
      this.report = res;
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    });
  }
  getMonthlyReports(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/MonthlyReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.report = res;
      this.totalOrders=res.map((a:any) => a.orders).reduce(function(a:any, b:any){return a + b;})
      this.totalSales=res.map((a:any) => a.sales).reduce(function(a:any, b:any){return a + b;})
      this.totalFines=res.map((a:any) => a.fines).reduce(function(a:any, b:any){return a + b;})
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    });
  }
  getStaitstics(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/Staitstics").subscribe(res=>{
      this.spinner.hide();
      this.staitstics = res;
      console.log(res)
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    });
  }
  getNewUsers(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/GetNewUsers").subscribe(res=>{
      this.spinner.hide();
      this.newUsers = res;
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    });
  }
  getMonthlySalary(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/MonthlySalaryReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.salaries = res;
      this.totlatSalary=res.map((a:any) => a.salary).reduce(function(a:any, b:any){return a + b;})

    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    });
  }

}
