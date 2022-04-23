import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  libraries:any=[];
  selectedLibrary:any=[];

  constructor(private http:HttpClient,private toastr:ToastrService,private spinner:NgxSpinnerService ) { }

  getAllLibraries(){
    this.spinner.show;
    this.http.get('https://localhost:44346/api/Library/GetLibraries').subscribe((res)=>{
     this.libraries=res;
     this.spinner.hide;
     this.toastr.success('Data Retrieved!!');
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message,err.status);
    })
  }

  createLibrary(body:any){
    this.spinner.show;
    this.http.post('https://localhost:44346/api/Library/CreateLibrary/',body).subscribe((res)=>{
      this.spinner.hide;
      this.toastr.success('Create Library Successfully :)');
    },err=>{
      this.spinner.hide();
      this.toastr.error(err.message , err.status)
    })

  }
  updateLibrary(body:any){
   this.spinner.show;
   this.http.put('https://localhost:44346/api/Library/UpdateLibrary/',body).subscribe((res)=>{
     this.spinner.hide;
    this.toastr.success('updated Successfully :)') ;
   },err=>{
    this.spinner.hide;
    this.toastr.error(err.message , err.status)
   })
  }
  deleteLibrary(id:number){
    this.http.delete('https://localhost:44346/api/Library/DeleteLibrary/'+id).subscribe((res)=>{
      this.toastr.success('Deleted Successfully :)');
    },err=>{
      this.toastr.error(err.message,err.status)
    })
  }
  getByName(name:string){

    this.spinner.show;
    this.http.get('https://localhost:44346/api/Library/GetLibraries/'+name).subscribe((res)=>{
      this.selectedLibrary= res;
      this.spinner.hide;
      this.toastr.success('Data Retrieved !!')
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message, err.status);
    })
  }
  getByLocation(location:string){
    this.spinner.show;
    this.http.get('https://localhost:44346/api/Library/LibrariesByLocation/'+location).subscribe((res)=>
    {
      this.selectedLibrary=res;
      this.spinner.hide;
      this.toastr.success('Data Retrieved !!')
    },err=>{
      this.spinner.hide;
      this.toastr.error(err.message, err.status);
    })
  }
}
