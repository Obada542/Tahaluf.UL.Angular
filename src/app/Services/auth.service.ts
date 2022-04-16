import { LoaningService } from './loaning.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any;
  constructor(public spinner :NgxSpinnerService,public loaning:LoaningService, public router:Router, private http :HttpClient,private toater:ToastrService) { }

  submit(email:any, password:any){
    this.spinner.show();
    var body ={
      email:email.value.toString(),
      password:password.value.toString()
    }
    const headerDir={
      'Content-Type':'application/json',
      'Accept':'application/json'
    }
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    this.http.post('https://localhost:44346/api/jwt/login/',body,requestOptions)
    .subscribe((res:any)=>{
      const responce ={
        token:res.toString()
      }
      localStorage.setItem('token', responce.token);
       let data:any= jwt_decode(responce.token);

       localStorage.setItem('user',JSON.stringify({...data}));
      if(data.role=="Admin"){
        setTimeout(()=>{
          this.getUser()

          },1500);
        this.router.navigate(['admin/dashboard']);
      }

      else if (data.role=="Student"){
        setTimeout(()=>{
          this.getUser()
          },1500);
          setTimeout(()=>{
            this.router.navigate(['home']);
          this.spinner.hide();

            },2500);
      }
      else if(data.role=="Accountant"){
        setTimeout(()=>{
          this.getUser()
          },1500);
        this.router.navigate(['accountant/dashboard']);
      }
    },err=>{
      this.spinner.hide();
      this.router.navigate(['security/login']);
      this.toater.error('Error Login ')
    })

  }
  getUser(){
    const local:any =localStorage.getItem('user')
    this.user = JSON.parse( local);
    const id:number = this.user.certserialnumber;
    if(this.user.role === "Student"){
      this.http.get('https://localhost:44346/api/student/getdata/'+id)
      .subscribe((res: any) => {
        this.user = res;

        setTimeout(()=>{
          this.loaning.getStudentLoans(this.user.id);
          },5000);

        this.toater.success("Welcome back "+this.user.first_Name + " "+this.user.last_Name);
      }, err => {
        this.spinner.hide();
        this.toater.error(err.message, err.status);
      });
    }else{

    }
  }

  CartSubject = new Subject<any>();
}
