import { Router, RouterModule } from '@angular/router';
import { StudentService } from './../../Services/student.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  constructor(private studentService:StudentService,private route:Router) { }
  ngOnInit(): void {
  }

  onChange(){
    if(this.registerGroup.controls['password'].value==this.registerGroup.controls['ConfirmPassword'].value)
      this.registerGroup.controls['ConfirmPassword'].setErrors(null);
    else
      this.registerGroup.controls['ConfirmPassword'].setErrors({mismatch:true});
  }
  register(){
    this.studentService.createStudentFromWebsite(this.registerGroup.value);
  }
}
