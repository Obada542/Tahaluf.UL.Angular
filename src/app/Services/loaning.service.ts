import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaningService {
  loans: any = [];
  studentloans: any
  constructor(public datepipe: DatePipe, private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  getAllLoans() {
    this.spinner.show();
    this.http.get("https://localhost:44346/api/loaning/").subscribe(res => {
      this.spinner.hide();
      this.toastr.success("Loan Data Retrieved!!");
      this.loans = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  getStudentLoans(id: any) {
    this.http.get("https://localhost:44346/api/loaning/StudentBorrowing/" + id).subscribe(res => {
      this.studentloans = res;
      console.log(res)
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  sendLateFeesMessage() {
    const email = {
      emailFrom: "obada.tawfiq700@gmail.com",
      password: "Obada0789735213"
    }
    this.http.post("https://localhost:44346/api/jwt/LateFeesEmail/", email).subscribe(res => {
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  createLoan(loan: any, visa: any) {
    this.spinner.show();
    console.log(visa)
    this.http.post("https://localhost:44346/api/payment", visa).subscribe((res: any) => {

      if (res <= 0 || res == null) {
        this.spinner.hide();
        this.toastr.warning("Please try again with another card.")
      } else if (res < loan.price) {
        this.spinner.hide();
        this.toastr.warning("You dont have enough money to buy this book.")
      } else {
        visa.amount = loan.price;
        const card = this.http.put("https://localhost:44346/api/payment/", visa, { responseType: 'text' })
        const borrow = this.http.post("https://localhost:44346/api/loaning/", loan, { responseType: 'text' })
        const book = this.http.put('https://localhost:44346/api/book/updatesold/' + loan.book_Id, { responseType: 'text' });
        forkJoin(borrow, book,card).subscribe(([res1, res2,res3]) => {
          this.toastr.success("Thanks :).");
          setTimeout(()=>{
            this.spinner.hide();
            location.reload
          },2000)
        }, err => {
          this.spinner.hide();
          this.toastr.error(err.message, err.status);
        });
      }
      console.log(res)
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
  updateLoan(data: any) {
    this.spinner.show();
    this.http.put("https://localhost:44346/api/loaning/", data).subscribe(res => {
      this.spinner.hide();
      this.toastr.success("Loan updated successfully!!");
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  searchByDates(data: any) {
    this.spinner.show();
    data.start_Date = this.datepipe.transform(data.start_Date, 'dd-MMMM-yyyy');
    data.end_Date = this.datepipe.transform(data.end_Date, 'dd-MMMM-yyyy');
    this.http.post("https://localhost:44346/api/loaning/SearchInterval/", data).subscribe(res => {
      this.spinner.hide();
      this.loans = res;
      this.toastr.success("search successfully!!");
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
}
