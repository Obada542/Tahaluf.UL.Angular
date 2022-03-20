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
  @ViewChild('updateBook') updateBook!: TemplateRef<any>;
  @ViewChild('deleteBook') deleteBook!: TemplateRef<any>;

  selectedBook!: any;
  id: any;
  books: Array<any> = [];

  createbook: FormGroup = new FormGroup({
    book_Name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    overview: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required]),
    library_Id: new FormControl('', [Validators.required],),
    category: new FormControl('', [Validators.required]),
  });

  updatebook: FormGroup = new FormGroup({
    id: new FormControl(''),
    book_Name: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    overview: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
    image: new FormControl(''),
    library_Id: new FormControl('', [Validators.required],),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private dialog: MatDialog, public book: BookService) {
  }

  ngOnInit(): void {
    this.book.getAllLibraries();
    this.book.getAllBooks();
  }

  openCreateDialog() {
    this.dialog.open(this.createNewBook)
  }
  openUpdateDialog(book: any) {
    this.selectedBook = book;
    this.updatebook.controls['id'].setValue(book.id);
    this.dialog.open(this.updateBook);
  }
  openDeleteDialog(id: number) {
    this.id = id;
    this.dialog.open(this.deleteBook)
  }
  uploadFile(file: any) {
    if (file.length === 0) {
      return;
    }
    let fileUpload = <File>file[0];
    const fromData = new FormData();
    fromData.append('file', fileUpload, fileUpload.name);
    this.book.uploadAttachment(fromData);
  }

  submit() {
    this.book.createBook(this.createbook.value);
    location.reload();
  }
  update() {
    let image : string = this.updatebook.controls['image'].value;

    if(!image){
      this.book.display_Image = this.selectedBook.image;
    }
    this.book.updateBook(this.updatebook.value);
    location.reload();
  }
  delete() {
    this.book.deleteBook(this.id);
    location.reload();
  }
  searchBook(event: any) {
    var searchbooks: Array<any> = [];
    for (let i = 0; i < this.book.books.length; i++) {
      const book: string = this.book.books[i].book_Name.toLowerCase();
      if (book.includes(event.target.value.toLowerCase())) {
        searchbooks.push(this.book.books[i]);
      }
    }
    this.books = searchbooks;
  }
}
