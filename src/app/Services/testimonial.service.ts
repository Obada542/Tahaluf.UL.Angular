import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  testsss: any;
  students: any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  getAllTestimonial() {
    this.spinner.show();
    return this.http.get('https://localhost:44346/api/testimonial/').subscribe((res) => {
      this.testsss = res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved!!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  getAllStudent() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/student/').subscribe((res) => {
      this.spinner.hide();
      this.students = res;
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }

  createTestimonial(data:any){
    this.spinner.show();
    this.http.post('https://localhost:44346/api/testimonial/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Testimonial Send Successfully, Thank You :)')
      location.reload();
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

  updateTestimonial(data:any){
    this.spinner.show();
    this.http.put('https://localhost:44346/api/testimonial/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update Testimonial Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }
}
