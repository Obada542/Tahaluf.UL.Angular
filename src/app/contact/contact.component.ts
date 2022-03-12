import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    message:new FormControl('',[Validators.required]),
    subject:new FormControl('',[Validators.required]),
    firstname:new FormControl('',[Validators.required]),
    lastname:new FormControl('',[Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
