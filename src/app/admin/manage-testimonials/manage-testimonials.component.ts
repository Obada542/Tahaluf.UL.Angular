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

  // selectedTest!: any;
  id: any;
  tests: Array<any> = [];

  selectedTes: any={
    id: 0,
    publishing: '',
   
  };

 

  // updatetestimonial: FormGroup = new FormGroup({
  //   id: new FormControl(''),
  //   name: new FormControl('', [Validators.required]),
  //   rate: new FormControl('', [Validators.required,Validators.maxLength(5),Validators.min(0)]),
  //   //testimonial: new FormControl('', [Validators.required, ]),
  //   student_Id: new FormControl('', ),
  // });
  constructor(private dialog: MatDialog, public testimonial: TestimonialService) { }

  ngOnInit(): void {
    this.testimonial.getAllStudent();
    this.testimonial.getAllTestimonial();
  }
 
  // openUpdateDialog(tst: any) {
  //   this.selectedTest = tst;
  //   this.updatetestimonial.controls['id'].setValue(tst.id);
  //   this.dialog.open(this.updateTestimonial);
  // }
  
  // update() {
  //   this.testss.updateTestimonial(this.updatetestimonial.value);
  //   location.reload();
  // }


  openChangeStatus(data:any){
    this.selectedTes.id = data.id;
    this.selectedTes.publishing = 'false';
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
