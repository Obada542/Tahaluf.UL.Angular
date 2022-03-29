import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartData, ChartOptions } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  report: any =[];
  report1: any =[];
  report2: any =[];
  report3: any =[];
  staitstics:any =[];
  newUsers:any;
  salaries:any = [];
  totalOrders:any;
  totalOrders1:any;
  totalOrders2:any;
  totalOrders3:any;
  totalFines:any;
  totalFines1:any;
  totalFines2:any;
  totalFines3:any;
  totalSales:any;
  totalSales1:any;
  totalSales2:any;
  totalSales3:any;
  totlatSalary:any;

  salesData!: ChartData<'bar'> ;
  chartOptions: ChartOptions= {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
  constructor(private http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) {}

  getAnnualReports(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/AnnualReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.report = res;
      this.salesData= {
        labels: res.map(function(a:any) {return a.period;}).reverse(),
        datasets: [
          { label: 'Orders', data: res.map(function(a:any) {return a.orders;}).reverse() },
          { label: 'Sales', data: res.map(function(a:any) {return a.sales;}).reverse() },
          { label: 'Fines', data: res.map(function(a:any) {return a.fines;}).reverse() },
        ],
      };
      this.chartOptions!.plugins!.title!.text='Annual Sales Data';

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
      this.salesData= {
        labels: res.map(function(a:any) {return a.period;}).reverse(),
        datasets: [
          { label: 'Orders', data: res.map(function(a:any) {return a.orders;}).reverse() },
          { label: 'Sales', data: res.map(function(a:any) {return a.sales;}).reverse() },
          { label: 'Fines', data: res.map(function(a:any) {return a.fines;}).reverse() },
        ],
      };
      this.chartOptions!.plugins!.title!.text='Monthly Sales Data';
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

  getDailyBook(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/BookDailyReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.report1= res;
      this.totalOrders1=res.map((a:any) => a.orders).reduce(function(a:any, b:any){return a + b;})
      this.totalSales1=res.map((a:any) => a.sales).reduce(function(a:any, b:any){return a + b;})
      this.totalFines1=res.map((a:any) => a.fines).reduce(function(a:any, b:any){return a + b;})
      this.salesData= {
        labels: res.map(function(a:any) {return a.period;}).reverse(),
        datasets: [
          { label: 'Orders', data: res.map(function(a:any) {return a.orders;}).reverse() },
          { label: 'Sales', data: res.map(function(a:any) {return a.sales;}).reverse() },
          { label: 'Fines', data: res.map(function(a:any) {return a.fines;}).reverse() },
          { label: 'Book', data: res.map(function(a:any) {return a.bookname;}).reverse() },

        ],
      };
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    })
  }


  getMonthlyBook(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/BookMonthlyReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.report2= res;
      this.totalOrders2=res.map((a:any) => a.orders).reduce(function(a:any, b:any){return a + b;})
      this.totalSales2=res.map((a:any) => a.sales).reduce(function(a:any, b:any){return a + b;})
      this.totalFines2=res.map((a:any) => a.fines).reduce(function(a:any, b:any){return a + b;})
      this.salesData= {
        labels: res.map(function(a:any) {return a.period;}).reverse(),
        datasets: [
          { label: 'Orders', data: res.map(function(a:any) {return a.orders;}).reverse() },
          { label: 'Sales', data: res.map(function(a:any) {return a.sales;}).reverse() },
          { label: 'Fines', data: res.map(function(a:any) {return a.fines;}).reverse() },
          { label: 'Book', data: res.map(function(a:any) {return a.bookname;}).reverse() },

        ],
      };
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    })
  }

  getAnnualBook(){
    this.spinner.show();
    this.http.get("https://localhost:44346/api/report/BookAnnualReport").subscribe((res:any)=>{
      this.spinner.hide();
      this.report3= res;
      this.totalOrders3=res.map((a:any) => a.orders).reduce(function(a:any, b:any){return a + b;})
      this.totalSales3=res.map((a:any) => a.sales).reduce(function(a:any, b:any){return a + b;})
      this.totalFines3=res.map((a:any) => a.fines).reduce(function(a:any, b:any){return a + b;})
      this.salesData= {
        labels: res.map(function(a:any) {return a.period;}).reverse(),
        datasets: [
          { label: 'Orders', data: res.map(function(a:any) {return a.orders;}).reverse() },
          { label: 'Sales', data: res.map(function(a:any) {return a.sales;}).reverse() },
          { label: 'Fines', data: res.map(function(a:any) {return a.fines;}).reverse() },
          { label: 'Book', data: res.map(function(a:any) {return a.bookname;}).reverse() },

        ],
      };
    },err=>{
      this.spinner.hide()
      this.toastr.error(err.message,err.status);
    })
  }

}
