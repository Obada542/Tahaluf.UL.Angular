import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMsgService } from '../Services/contact-msg.service';

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
    name:new FormControl(),
  });
  constructor(public contact: ContactMsgService) { }

  ngOnInit(): void {
  }


  submit(){
    this.contactForm.controls['name'].setValue(this.contactForm.value.firstname + ' ' + this.contactForm.value.lastname)
    this.contact.createMessage(this.contactForm.value);
    location.reload();
  }
}
