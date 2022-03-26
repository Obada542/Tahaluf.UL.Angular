import { MatDialog } from '@angular/material/dialog';
import { Component,  OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  @ViewChild('createNewEmployee') createNewEmployee!: TemplateRef<any>;
  @ViewChild('updateemployee') updateemployee!: TemplateRef<any>;
  @ViewChild('deleteEmployee') deleteEmployee!: TemplateRef<any>;

  id!:number;
  selectedEmployee:any;
  employees: Array<any> = [];

  createEmployee: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role_Id: new FormControl(),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
    address: new FormControl('')
  });
  updateEmployee: FormGroup = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    salary: new FormControl('', [Validators.required, Validators.min(1)]),
    address: new FormControl('')
  });
  constructor(public employeeService: EmployeeService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees();
  }
  openCreateDialog() {
    this.employeeService.display_Image = "";
    this.dialog.open(this.createNewEmployee)
  }
  searchEmployee(emp: any) {
    var searchemployees: Array<any> = [];
    for (let i = 0; i < this.employeeService.login.length; i++) {
      const employee: string = this.employeeService.login[i].username.toLowerCase();
      if (employee.includes(emp.target.value.toLowerCase())) {
        searchemployees.push(this.employeeService.login[i]);
      }
    }
    this.employees = searchemployees;
  }
  openDeleteDialog(id: number) {
    this.id = id;
    this.dialog.open(this.deleteEmployee)
  }
  openUpdateDialog(emp: any) {
    this.selectedEmployee = emp;
    this.selectedEmployee.salary = this.accountantSalary(emp.id);
    this.selectedEmployee.address = this.accountantAddress(emp.id);
    this.employeeService.display_Image = emp.image;
    this.updateEmployee.controls['id'].setValue(emp.id);
    this.dialog.open(this.updateemployee)
  }
  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.employeeService.uploadAttachment(fromData);
  }
  submit(){
    this.employeeService.createEmployee(this.createEmployee.value);
  }
  update(){
    let image : string = this.updateEmployee.controls['image'].value;
    if(!image){
      this.employeeService.display_Image = this.selectedEmployee.image;
    }
    this.employeeService.updateEmployee(this.updateEmployee.value);
    location.reload();
  }
  delete(){
    this.employeeService.deleteEmployee(this.id);
    location.reload();
  }
  accountantSalary(id:any){
    if(this.employeeService.employees){
      return this.employeeService.employees.find((x:any)=>x.login_Id==id).salary;
    }
  }
  accountantAddress(id:any){
    if(this.employeeService.employees){
      return this.employeeService.employees.find((x:any)=>x.login_Id==id).address;
    }
  }
}
