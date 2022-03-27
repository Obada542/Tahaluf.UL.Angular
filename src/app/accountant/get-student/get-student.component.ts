import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-get-student',
  templateUrl: './get-student.component.html',
  styleUrls: ['./get-student.component.css']
})
export class GetStudentComponent implements OnInit {
  students: Array<any> = [];

  constructor( public studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAllStudents();
  }


  studentFirstName(id:any){
    if(this.studentService.students){
      return this.studentService.students.find((x:any)=>x.login_Id==id).first_Name;
    }
  }
  studentLastName(id:any){
    if(this.studentService.students){
      return this.studentService.students.find((x:any)=>x.login_Id==id).last_Name;
    }
  }
  
  searchStudent(std: any) {
    var searchemployees: Array<any> = [];
    for (let i = 0; i < this.studentService.login.length; i++) {
      const name: string = this.studentService.students[i].first_Name.toLowerCase() + ' '+ this.studentService.students[i].last_Name.toLowerCase();
       if(name.includes(std.target.value.toLowerCase())){
        searchemployees.push(this.studentService.login.find((x:any)=>this.studentService.students[i].login_Id==x.id));
      }
    }
    this.students = searchemployees;
  }
}
