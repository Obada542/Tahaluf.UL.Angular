import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: any;
  login: any;
  display_Image: any;

  constructor(private http: HttpClient,private route:Router ,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  getAllStudents() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/login/')
      .subscribe((res: any) => {
        var log: Array<any> = res;
        this.login = log.filter((x: any) => x.role_Id == 2);
      }, err => {
        this.toastr.error(err.message, err.status);
      });
    this.http.get('https://localhost:44346/api/student/')
      .subscribe((res: any) => {
        this.spinner.hide();
        this.students = res;
        this.toastr.success("Data Retrieved successfully");
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
  }
  createStudent(login: any) {
    this.spinner.show();
    login.image = this.display_Image;
    login.role_Id = 2;
    this.http.post('https://localhost:44346/api/login/', login)
      .subscribe((res: any) => {
        login.login_Id = res;
        return this.http.post('https://localhost:44346/api/student/', login)
          .subscribe((res) => {
            this.spinner.hide();
            this.toastr.success("New Student added successfully");
            location.reload();
          }, err => {
            this.toastr.error(err.message, err.status);
          });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
  }
  createStudentFromWebsite(login: any) {
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
  updateStudent(login: any) {
    this.spinner.show();
    login.image = this.display_Image;
    login.role_Id = 2;
    const stdId:number = this.students.find((x: any) => x.login_Id == login.id).id;
    const student = {
      id:stdId,
      first_Name:login.first_Name,
      last_Name:login.last_Name
    }
    this.http.put('https://localhost:44346/api/student', student)
      .subscribe((res) => {
        console.log(res)
        this.spinner.hide();
        this.toastr.success("student Updated successfully");
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    this.http.put('https://localhost:44346/api/login/Update/', login)
      .subscribe((res) => {
        this.spinner.hide();
        location.reload();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
  }
  deleteStudent(id: number) {
    this.spinner.show();
    const stdId:number = this.students.find((x: any) => x.login_Id == id).id;
    this.http.delete('https://localhost:44346/api/login/Delete/' + id)
      .subscribe((res:any) => {
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, err.status);
      });
    this.http.delete('https://localhost:44346/api/student/delete/' + stdId)
      .subscribe((res) => {
        this.spinner.hide();
        this.toastr.warning("Student Deleted successfully");
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
