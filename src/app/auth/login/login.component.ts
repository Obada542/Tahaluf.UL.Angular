import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from 'src/app/Services/login.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('',[Validators.required,Validators.email]);
 password=new FormControl('',[Validators.required,Validators.minLength(8)]);

  // formGroup :FormGroup = new FormGroup({
  //   email : new FormControl('',[Validators.required,Validators.email]),
  //   password: new FormControl('',[Validators.required,Validators.minLength(8)])
  // })

  user:any ={};
  constructor( private auth:AuthService) { }
  ngOnInit(): void {
  }

  remember(){
    // this.user= Object.assign(this.user,this.formGroup.value);
    // localStorage.setItem("user",JSON.stringify(this.user));
  }
  submit(){
    this.auth.submit(this.email,this.password);
  }
}
