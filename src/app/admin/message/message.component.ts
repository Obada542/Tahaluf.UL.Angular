import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactMsgService } from 'src/app/Services/contact-msg.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  @ViewChild('sendMsg') sendMsg! :TemplateRef<any>
  @ViewChild('deleteMsg') deleteMsg! :TemplateRef<any>
  
  createMsg: FormGroup = new FormGroup({
    subject: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),

  });

  constructor(private dialog:MatDialog, public msg:ContactMsgService) { }
  Id:any;

  ngOnInit(): void {
    this.msg.getAllMessages();
  }

  
  openDeleteDialog(id: number) {
    this.Id = id;
    this.dialog.open(this.deleteMsg);
  }

  delete(){
    this.msg.deleteMessage(this.Id);
    location.reload();
  }




}
