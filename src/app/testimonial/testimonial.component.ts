import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../Services/testimonial.service';

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

  constructor(public testss: TestimonialService) { }

  ngOnInit(): void {
    this.testss.getAllStudent();
  }

  submit() {
    this.testss.createTestimonial(this.createtestimonial.value);
  }

}
