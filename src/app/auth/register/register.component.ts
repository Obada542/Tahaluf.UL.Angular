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
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    Birthday: new FormControl('',[Validators.required])


  })
  


  constructor() { }

  ngOnInit(): void {
  }

  onChange(){
    if(this.registerGroup.controls['password'].value==this.registerGroup.controls['ConfirmPassword'].value)
    this.registerGroup.controls['ConfirmPassword'].setErrors(null);

    else 

this.registerGroup.controls['ConfirmPassword'].setErrors({mismatch:true});

  }

}
