import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from 'src/app/Services/testimonial.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
})
export class TestimonialComponent implements OnInit {
  createtestimonial: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    rate: new FormControl('', [Validators.required,Validators.maxLength(5),Validators.min(0)]),
    testimonial: new FormControl('', [Validators.required]),
    student_Id: new FormControl(''),
  });

  constructor(public testss: TestimonialService, public userService:AuthService) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
  }

  submit() {
    this.createtestimonial.controls['student_Id'].setValue(this.userService.user.id);
    this.testss.createTestimonial(this.createtestimonial.value);
  }

}
