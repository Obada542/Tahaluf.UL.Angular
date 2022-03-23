import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ContactMsgService {
  data:any=[];
  msgs: Array<any> = [];

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  getAllMessages() {
    this.spinner.show();
    this.http.get('https://localhost:44346/api/Message/').subscribe((res) => {
      this.data = res;
      this.spinner.hide();
      this.toastr.success('Messages Retrieved');
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message,err.status);
    })
  }

  createMessage(body:any){
    this.spinner.show();
    this.http.post('https://localhost:44346/api/Message/',body)
    .subscribe((res:any)=>{
      this.spinner.hide();
      this.toastr.success('Message sent Successfully :)')
    }, err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })
  }

  deleteMessage(id:number){
    this.spinner.show();
    this.http.delete('https://localhost:44346/api/Message/Delete/'+id).subscribe((res)=>{
      this.toastr.success('Message Deleted Successfully :)');
      this.spinner.hide();
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.status,err.message);
    })
  }
}
