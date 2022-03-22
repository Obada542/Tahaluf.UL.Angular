import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: any;
  data:any=[];

  
  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  getAllRoles() {
    this.spinner.show();
    return this.http.get('https://localhost:44345/api/Role/').subscribe((res) => {
      this.data = res;
      this.spinner.hide();
      this.toastr.success('Data Retrieved!!');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }

  // createRoles(data:any){
  //   this.spinner.show();
  //   this.http.post('https://localhost:44345/api/Role/',data).subscribe((res:any)=>{
  //     this.spinner.hide();
  //     this.toastr.success('Create Role Successfully :)')
  //   }, err=>{
  //     this.spinner.hide();
  //     this.toastr.error(err.message , err.status)
  //   })
  // }


  updateRole(data:any){
    this.spinner.show();
    this.http.put('https://localhost:44345/api/Role/Update/',data).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Update Role Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

  deleteRole(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:44345/api/Role/Delete/' + id).subscribe((res)=>{
      this.spinner.hide();
      this.toastr.warning('Delete Role Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }  
}
