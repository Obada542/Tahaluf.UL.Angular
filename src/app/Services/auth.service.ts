import { LoaningService } from './loaning.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";

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
        this.getUser()
        this.spinner.hide();
        this.router.navigate(['admin/dashboard']);
      }

      else if (data.role=="Student"){
        this.getUser()
        this.spinner.hide();
        this.router.navigate(['home']);
      }
      else if(data.role=="Accountant"){
        this.getUser()
        this.spinner.hide();
        this.router.navigate(['accountant/dashboard']);
      }
    },err=>{
      this.spinner.hide();
      this.router.navigate(['security/login']);
      this.toater.error('Error Login ')
    })

  }
  getUser(){
    this.spinner.show();
    const local:any =localStorage.getItem('user')
    this.user = JSON.parse( local);
    const id:number = this.user.certserialnumber
    if(this.user.role === "Student"){
      this.http.get('https://localhost:44346/api/student/getdata/'+id)
      .subscribe((res: any) => {
        this.spinner.hide();
        this.user = res;
        this.loaning.getStudentLoans(this.user.id);

        this.toater.success("Welcome back "+this.user.first_Name + " "+this.user.last_Name);
      }, err => {
        this.spinner.hide();
        this.toater.error(err.message, err.status);
      });
    }else{

    }
  }
}
