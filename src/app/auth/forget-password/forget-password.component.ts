import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { LoginService } from 'src/app/Services/login.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
 /* snedForgotPasswordEmail : FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
  })*/
  email = new FormControl('',[Validators.required,Validators.email]);

  password:any;

  


  constructor(private router:Router,private login:LoginService, public spinner :NgxSpinnerService,private stdService:StudentService,private route:Router, private toastr: ToastrService,private dialogRef:MatDialog) { }

  ngOnInit(): void 
  {
    this.stdService.getAllStudents();
  }



 /* submit(){

   var emailS= this.stdService.login.find((x: any) => x.email ==this.email.value)
 
   if(emailS){
    this.password= "Your Password is : " + emailS.password;

   }
   else{

    console.log("email is not correct");

   }
   
   }*/

 submit(){
    var emailS= this.stdService.login.find((x: any) => x.email ==this.email.value)

    if(emailS){
      this.password="Your Password Is : " + emailS.password;
    }
    else{
      this.toastr.error("Email Is Not Correct")
    }
  }
 
}