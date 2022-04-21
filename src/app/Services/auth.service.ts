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
  display_Image: any;

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

  updateUser(login: any) {
    // debugger;
    this.spinner.show();
     login.image = this.display_Image;
    var student = {
      id: login.id,
      first_Name: login.first_Name,
      last_Name: login.last_Name,
      login_Id:  login.login_Id
    }
    this.http.put('https://localhost:44346/api/student', student)
      .subscribe((res) => {
        this.user.first_Name= student.first_Name;
        this.user.last_Name= student.last_Name;
        this.spinner.hide();
        //  this.toater.success("Profile Updated successfully");
        // login.first_Name= student.first_Name;
        // login.last_Name= student.last_Name;
      }, err => {
        this.spinner.hide();
        this.toater.error(err.message, err.status);
      });

      var loginInfo = {
      // login_Id: login.login_Id,
      //  login_Id: this.user.certserialnumber,
        id: login.login_Id,
        // first_Name: login.first_Name,
        // last_Name: login.last_Name,
        username: login.username,
        email: login.email,
        phone:login.phone,
        birthday: login.birthday,
        password:login.password,
        image:this.display_Image
      }
    this.http.put('https://localhost:44346/api/login/Update/', loginInfo )
      .subscribe((res) => {
        this.user.login_Id= loginInfo.id;
        this.user.username= loginInfo.username;
        this.user.email= loginInfo.email;
        this.user.phone=loginInfo.phone;
        this.user.birthday= loginInfo.birthday;
        this.user.password= loginInfo.password;
        // this.user.image=loginInfo.image;


        this.spinner.hide();
        this.toater.success("Profile Updated successfully");
       
        // location.reload();
      }, err => {
        this.spinner.hide();
        this.toater.error(err.message, err.status);
      });
  }

  uploadAttachment(file: FormData) {
    this.http.post('https://localhost:44346/api/login/uploadImage/', file)
      .subscribe((res: any) => {
        this.display_Image = res.image;
      }, err => {
        this.toater.error(err.message, err.status);
      });
  }

}
