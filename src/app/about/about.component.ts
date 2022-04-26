import { Component, OnInit } from '@angular/core';
import { NewsService } from '../Services/news.service';
import { StudentService } from '../Services/student.service';
import { TestimonialService } from '../Services/testimonial.service';
import { WebsitePartsService } from '../Services/website-parts.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
imageUrl:string='/assets/images/mm.jpg';
  constructor(public website:WebsitePartsService,public test:TestimonialService,public news :NewsService,public std:StudentService) { }

  ngOnInit(): void {
    this.website.getAbout();
     this.test.getAllTestimonial();
     this.news.getAllNews();
     this.std.updateStudent;
     this.news.updateNews;
     this.std.getAllStudents();
  }

  getStudentImage(id: number) {
    if (this.std.login) {
      const student = this.std.students.find((x: any) => x.id == id);
      return this.std.login.find((x: any) => x.id == student.login_Id).image;
    }
  }

}
