import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Services/report.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public reportService:ReportService) { }

  ngOnInit(): void {
    this.reportService.getNewUsers();
    this.reportService.getMonthlyReports();
    this.reportService.getStaitstics();
    this.reportService.getMonthlySalary();
  }
  changePeriod(period:any){

    if(period.target.value === 'monthly'){
      this.reportService.getMonthlyReports();
    }
    else{
      this.reportService.getAnnualReports();
    }
  }
  changePeriodSalary(period:any){
    if(period.target.value === 'monthly'){
      this.reportService.getMonthlySalary();
    }
    else{
      this.reportService.getAnnualSalary();
    }
  }
  downloadAsPdf(){
    const doc = new jsPDF();
    autoTable(doc, { html: '#table' });
    doc.save('Sales-report.pdf');
  }
  exportexcel(){
      const fileName= 'Sales-report.xlsx';
       let element = document.getElementById('table');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       XLSX.writeFile(wb,fileName);
    }
}
