import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/Services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  
  selectedRole!: any;
  Id:any;


  @ViewChild('createNewRole') createNewRole! :TemplateRef<any>
  @ViewChild('updateRoles') updateRoles! :TemplateRef<any>
  @ViewChild('deleteRoles') deleteRoles! :TemplateRef<any>

  createRole: FormGroup = new FormGroup({
    role_Name: new FormControl('', Validators.required),
  })

  updateRole:FormGroup=new FormGroup({
    id:new FormControl(''),
    role_Name: new FormControl('', Validators.required),
  })
  
  constructor(private dialog:MatDialog, public role:RoleService) { }

  ngOnInit(): void {
    this.role.getAllRoles();
  }


  create(){
    this.dialog.open(this.createNewRole);
  }

  // submit(){
  //   this.role.createRoles(this.createRole.value);
  //   location.reload();
  // }

    openUpdateDialog(role:any)
    {
      this.selectedRole=role;
      this.updateRole.controls['id'].setValue(role.id);
      this.dialog.open(this.updateRoles);
    }
  
    update(){
      this.role.updateRole(this.updateRole.value);
      location.reload();
    }
  
  
    openDeleteDialog(id:number)
    {
      this.Id=id;
        const dialogRef=this.dialog.open(this.deleteRoles);
        dialogRef.afterClosed().subscribe((result)=>{
          if(result!=undefined)
          {
            if(result=='yes')
            this.role.deleteRole(id);
            else if(result=='no')
            console.log("Thank you ");
          }
        })
    }
  
    delete(){
      this.role.deleteRole(this.Id);
      location.reload();
    }
  
  


}
