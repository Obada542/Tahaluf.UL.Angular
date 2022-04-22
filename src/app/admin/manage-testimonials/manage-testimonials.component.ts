import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css']
})
export class ManageTestimonialsComponent implements OnInit {
  @ViewChild("change") change!: TemplateRef<any>;
  @ViewChild('updateTestimonial') updateTestimonial!: TemplateRef<any>;
  id: any;
  tests: Array<any> = [];

  selectedTes: any={
    id: 0,
    publishing: '',
  };

  constructor(private dialog: MatDialog, public testimonial: TestimonialService) { }

  ngOnInit(): void {
    this.testimonial.getAllTestimonial();
  }
  openChangeStatus(data:any){
    this.selectedTes.id = data.id;
    console.log(data.publishing)
    this.dialog.open(this.change);
  }
  changeStatus(){
    this.testimonial.updateTestimonial(this.selectedTes);
    location.reload();
  }

  studentname(id:number){
    if(this.testimonial.students.length > 0)
      return this.testimonial.students.find((x:any)=>x.id==id).first_Name;
  }

  searchTest(event: any) {
    var searchtests: Array<any> = [];
    for (let i = 0; i < this.testimonial.testsss.length; i++) {
      const test: string = this.testimonial.testsss[i].name.toLowerCase();
      if (test.includes(event.target.value.toLowerCase())) {
        searchtests.push(this.testimonial.testsss[i]);
      }
    }
      this.tests = searchtests;
  }
}
