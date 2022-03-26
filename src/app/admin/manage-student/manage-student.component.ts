import { StudentService } from './../../Services/student.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-student',
  templateUrl: './manage-student.component.html',
  styleUrls: ['./manage-student.component.css']
})
export class ManageStudentComponent implements OnInit {

  @ViewChild('createNewStudent') createNewStudent!: TemplateRef<any>;
  @ViewChild('updatestudent') updatestudent!: TemplateRef<any>;
  @ViewChild('deleteStudent') deleteStudent!: TemplateRef<any>;

  id!:number;
  selectedStudent:any;
  students: Array<any> = [];

  createStudent: FormGroup = new FormGroup({
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  updateStudent: FormGroup = new FormGroup({
    id: new FormControl(''),
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    image: new FormControl('')
  });
  constructor(public studentService: StudentService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.studentService.getAllStudents();
  }
  openCreateDialog() {
    this.studentService.display_Image = "";
    this.dialog.open(this.createNewStudent)
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
  openDeleteDialog(id: number) {
    this.id = id;
    this.dialog.open(this.deleteStudent)
  }
  openUpdateDialog(student: any) {
    this.selectedStudent = student;
    this.selectedStudent.first_Name = this.studentFirstName(student.id);
    this.selectedStudent.last_Name = this.studentLastName(student.id);
    this.studentService.display_Image = student.image;
    this.updateStudent.controls['id'].setValue(student.id);
    this.dialog.open(this.updatestudent)
  }
  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.studentService.uploadAttachment(fromData);
  }
  submit(){
    this.studentService.createStudent(this.createStudent.value);
  }
  update(){
    let image : string = this.updateStudent.controls['image'].value;
    if(!image){
      this.studentService.display_Image = this.selectedStudent.image;
    }
    this.studentService.updateStudent(this.updateStudent.value);
  }
  delete(){
    this.studentService.deleteStudent(this.id);
    location.reload();
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
}
