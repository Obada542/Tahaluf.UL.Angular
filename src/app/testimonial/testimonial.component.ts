import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  testimonialForm: FormGroup= new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email]),
    testimonial: new FormControl('',Validators.required),
    rate: new FormControl('',Validators.required)
  });
  constructor() { }

  ngOnInit(): void {
  }
}