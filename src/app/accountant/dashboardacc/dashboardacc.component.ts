import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/Services/report.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboardacc',
  templateUrl: './dashboardacc.component.html',
  styleUrls: ['./dashboardacc.component.css']
})
export class DashboardaccComponent implements OnInit {

  constructor(public reportService: ReportService) { }

  ngOnInit(): void {
    this.reportService.getMonthlyReports();
    this.reportService. getDailyBook();
    this.reportService.getMonthlyBook();
    this.reportService.getAnnualBook();
  }

  changePeriod(period: any) {

    if (period.target.value === 'monthly') {
      this.reportService.getMonthlyReports();
    }
    else {
      this.reportService.getAnnualReports();
    }

  }

  downloadAsDailyPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#table' });
    doc.save('DailyBook-report.pdf');
  }
  exportexcelDaily() {
    const fileName = 'DailyBook-report.xlsx';
    let element = document.getElementById('table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    var wscols = [
      {wch:15},
      {wch:7},
      {wch:12},
      {wch:12},
      {wch:12}

  ];

  ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  downloadAsMonthlyPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#table2' });
    doc.save('MonthlyBook-report.pdf');
  }

  exportexcelMonthly() {
    const fileName = 'Monthly-report.xlsx';
    let element = document.getElementById('table2');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    var wscols = [
      {wch:15},
      {wch:7},
      {wch:12},
      {wch:12},
      {wch:12}

  ];

  ws['!cols'] = wscols;
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  downloadAsAnnoulPdf() {
    const doc = new jsPDF();
    autoTable(doc, { html: '#table3' });
    doc.save('AnnoulBook-report.pdf');
  }

  exportexcelAnnoul() {
    const fileName = 'Annoul-report.xlsx';
    let element = document.getElementById('table3');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }






}
