import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/Services/login.service';
import { AuthService } from 'src/app/Services/auth.service';
import { LoaningService } from 'src/app/Services/loaning.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerGroup :FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    ConfirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    username: new FormControl('', [Validators.required]),
    first_Name: new FormControl('',[Validators.required]),
    last_Name: new FormControl('',[Validators.required]),
    phone: new FormControl('',[Validators.required,Validators.minLength(10)]),
    birthday: new FormControl('',[Validators.required])
  });
  email = new FormControl('',[Validators.required,Validators.email]);
 password = new FormControl('',[Validators.required,Validators.minLength(8)]);
 

 

  // formGroup :FormGroup = new FormGroup({
  //   email : new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.minLength(8)])
  // })
  
  user:any ={};
  constructor(private router:Router,private login:LoginService, public spinner :NgxSpinnerService,private auth:AuthService,private studentService:LoginService,private route:Router,public loan:LoaningService) { }
  ngOnInit(): void {
     
  }
  onChange(){
    if(this.registerGroup.controls['password'].value==this.registerGroup.controls['ConfirmPassword'].value)
      this.registerGroup.controls['ConfirmPassword'].setErrors(null);
    else
      this.registerGroup.controls['ConfirmPassword'].setErrors({mismatch:true});
  }
  register(){
    this.studentService.createStudent(this.registerGroup.value);
  }
  remember(){
    // this.user= Object.assign(this.user,this.formGroup.value);
    // localStorage.setItem("user",JSON.stringify(this.user));
  }
  submit(){
    this.spinner.show();
    this.auth.submit(this.email,this.password);
    this.spinner.hide();
  }
}
