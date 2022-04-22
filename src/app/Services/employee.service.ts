import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees: any;
  login: any;
  display_Image: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getAllEmployees() {
    this.spinner.show();
    const logins = this.http.get('https://localhost:44346/api/login/');
    const accountants = this.http.get('https://localhost:44346/api/accountant/');
    forkJoin(logins, accountants).subscribe(([res1, res2]: any) => {
      this.login = res1.filter((x: any) => x.role_Id == 3);
      this.employees = res2;
      this.spinner.hide();

    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });

  }
  createEmployee(login: any) {
    this.spinner.show();
    login.image = this.display_Image;
    login.role_Id = 3;
    this.http.post('https://localhost:44346/api/login/', login)
      .subscribe((res: any) => {
        login.login_Id = res;
        return this.http.post('https://localhost:44346/api/accountant/', login)
          .subscribe((res) => {
            this.spinner.hide();
            this.toastr.success("New Employee added successfully");
            location.reload();
          }, err => {
            this.toastr.error(err.message, err.status);
          });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });

  }
  updateEmployee(login: any) {
    this.spinner.show();
    login.image = this.display_Image;
    const acc: any = {
      login_Id: login.id,
      address: login.address,
      salary: login.salary
    }
    const logins = this.http.put('https://localhost:44346/api/login/Update/', login);
    const accountants= this.http.put('https://localhost:44346/api/accountant/', acc)
    forkJoin(logins, accountants).subscribe(([res1, res2]: any) => {
      this.spinner.hide();
      this.toastr.success("Employee Updated successfully");
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  deleteEmployee(id: number) {
    this.spinner.show();
    const empId: number = this.employees.find((x: any) => x.login_Id == id).id;
    const logins = this.http.delete('https://localhost:44346/api/login/Delete/' + id);

    const accountants = this.http.delete('https://localhost:44346/api/accountant/delete/' + empId);
    forkJoin(logins, accountants).subscribe(([res1, res2]: any) => {
      this.spinner.hide();
      this.toastr.warning("deleted Employee successfully");
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, err.status);
    });
  }
  uploadAttachment(file: FormData) {
    this.http.post('https://localhost:44346/api/login/uploadImage/', file)
      .subscribe((res: any) => {
        this.display_Image = res.image;
      }, err => {
        this.toastr.error(err.message, err.status);
      });
  }
}
