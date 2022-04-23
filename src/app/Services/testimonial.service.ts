import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  testsss: any;
  students: any;
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  getAllTestimonial() {
    this.spinner.show();
    const students=this.http.get('https://localhost:44346/api/student/');

    const testimonials= this.http.get('https://localhost:44346/api/testimonial/');
    forkJoin(students,testimonials).subscribe(([res1,res2]) => {
      this.testsss = res2;
      this.students = res1;
      this.spinner.hide();
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
