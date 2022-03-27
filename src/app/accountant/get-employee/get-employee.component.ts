import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit {
  employees: Array<any> = [];

  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees();
  }

  accountantSalary(id:any){
    if(this.employeeService.employees){
      return this.employeeService.employees.find((x:any)=>x.login_Id==id).salary;
    }
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
}
