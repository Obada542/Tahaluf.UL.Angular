import { BookService } from './../../Services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-book',
  templateUrl: './manage-book.component.html',
  styleUrls: ['./manage-book.component.css']
})
export class ManageBookComponent implements OnInit {
  @ViewChild('createNewBook') createNewBook!: TemplateRef<any>;

  createbook: FormGroup = new FormGroup({
    book_name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    overview: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
    library_id: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });
  constructor(private dialog: MatDialog, private book: BookService) {
  }
  ngOnInit(): void {
  }
  createBook() {
    this.book.createBook(this.createbook.value);
  }
  openCreateDialog() {
    this.dialog.open(this.createNewBook)
  }
  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    // file[0]:'angular.png';
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.book.uploadAttachment(fromData);
  }
}
