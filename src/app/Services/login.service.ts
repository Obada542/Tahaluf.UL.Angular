import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private route: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
  createStudent(login: any) {
    this.spinner.show();
    login.role_Id = 2;
    this.http.post('https://localhost:44346/api/login/', login)
      .subscribe((res: any) => {
        login.login_Id = res;
        return this.http.post('https://localhost:44346/api/student/', login)
          .subscribe((res) => {
            this.route.navigate(['']).then(() => {
              window.location.reload();
            });
            this.spinner.hide();
          }, err => {
            this.toastr.error(err.message, err.status);
          });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
  }
}
