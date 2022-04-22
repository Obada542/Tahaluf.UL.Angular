import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  display_Image:any;
  data:any=[];

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  getAll() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Home/GetSliders/').subscribe((res) => {
      this.data = res;
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    });
  }
  createSliders(body:any){
    this.spinner.show();
    body.image=this.display_Image;
    this.http.post('https://localhost:44346/api/Home/CreateSlider/',body)
    .subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Create Slider Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    });
  }
  uploadAttachment(file:FormData)
  {
    this.http.post('https://localhost:44346/api/Home/uploadImage/',file)
    .subscribe((res:any)=>{
      this.display_Image=res.image;
    },err=>{
      this.toastr.error(err.message , err.status);
    });
  }
  updateHome(body:any){
    this.spinner.show();
    body.image=this.display_Image;
    this.http.put('https://localhost:44346/api/Home/UpdateSlider/',body).subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Updated Successfully ');
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.status,err.message);
    });
  }

  deleteItem(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:44346/api/Home/DeleteSlider/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.status,err.message);
    });
  }
}
