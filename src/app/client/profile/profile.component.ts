import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { StudentService } from 'src/app/Services/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updateStudentInfo: FormGroup = new FormGroup({
    id: new FormControl(''),
   login_Id: new FormControl(''),
    first_Name: new FormControl('', [Validators.required]),
    last_Name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    image: new FormControl('')
  });

  constructor(public userService:AuthService,public studentService:StudentService, private longDate: DatePipe) { }

  ngOnInit(): void {
  }

  update(){
    let image : string = this.updateStudentInfo.controls['image'].value;
    if(!image){
      this.userService.display_Image = this.userService.user.image;
    }

    this.updateStudentInfo.controls['id'].setValue(this.userService.user.id);
    this.updateStudentInfo.controls['login_Id'].setValue(this.userService.user.login_Id);
    this.userService.updateUser(this.updateStudentInfo.value);
    location.reload();
  }

  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.userService.uploadAttachment(fromData);
  }

  getDate(ev: any): any {
    this.userService.user.birthday= this.longDate.transform(ev);
  }

}
