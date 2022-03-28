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

  constructor(public spinner :NgxSpinnerService, public router:Router, private http :HttpClient,private toater:ToastrService) { }

  submit(email:any, password:any){

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

       localStorage.setItem('user',JSON.stringify({...data}))
      if(data.role=="Admin")
      this.router.navigate(['admin/dashboard']);
      else if (data.role=="Student")
      this.router.navigate(['home']);
      else if(data.role=="Accountant")
      this.router.navigate(['accountant/dashboard']);
    },err=>{
      this.router.navigate(['security/login']);
      this.toater.error('Error Login ')
    })

  }
}
