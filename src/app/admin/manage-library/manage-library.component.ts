import { LibraryService } from 'src/app/Services/library.service';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-manage-library',
  templateUrl: './manage-library.component.html',
  styleUrls: ['./manage-library.component.css']
})
export class ManageLibraryComponent implements OnInit {

  @ViewChild('createNewLibrary') createNewLibrary!: TemplateRef<any>;
  @ViewChild('updateLibrary') updateLibrary!: TemplateRef<any>;
  @ViewChild('deleteLibrary') deleteLibrary!: TemplateRef<any>;
  @ViewChild('map') map!: TemplateRef<any>;
  @ViewChild('mapAll') mapAll!: TemplateRef<any>;

  lat: number = 31.963158893209485;
  lng: number = 35.92289845781814;
  locations: any = [];
  selectedLibrary: any;
  id: any;

  searchL: Array<any> = [];

  createLibrary: FormGroup = new FormGroup({
    Library_Name: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
  });

  updatelibrary: FormGroup = new FormGroup({
    id: new FormControl(''),
    Library_Name: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
  });
  constructor(private dialog: MatDialog, public library: LibraryService) { }

  ngOnInit(): void {
    this.library.getAllLibraries()
  }

  openCreateDialog() {
    this.dialog.open(this.createNewLibrary);
  }

  openUpdateDialog(library: any) {
    this.selectedLibrary = library;
    var splitted = this.selectedLibrary.location.split(",");
    this.lat = Number(splitted[1]);
    this.lng = Number(splitted[2]);

    this.updatelibrary.controls['id'].setValue(library.id);
    this.dialog.open(this.updateLibrary);
  }

  openDeleteDialog(id: number) {
    this.id = id;
    this.dialog.open(this.deleteLibrary);
  }
  openMapAll() {
    for (var i = 0; i < this.library.libraries.length; i++) {
      const loca = this.library.libraries[i].location.split(",")
      this.locations.push({
        name: this.library.libraries[i].library_Name,
        address: loca[0],
        lat: loca[1],
        lng: loca[2]
      })
    }
    this.dialog.open(this.mapAll);

  }
  submit() {
    const loca = this.createLibrary.controls['Location'].value + ',' + this.lat + ',' + this.lng
    this.createLibrary.controls['Location'].setValue(loca)
    this.library.createLibrary(this.createLibrary.value);
    location.reload();
  }

  update() {

    const loca = this.updatelibrary.controls['Location'].value + ',' + this.lat + ',' + this.lng
    this.updatelibrary.controls['Location'].setValue(loca)
    this.library.updateLibrary(this.updatelibrary.value);
    location.reload();
  }

  delete() {
    this.library.deleteLibrary(this.id);
    location.reload();
  }
  openMap() {
    this.dialog.open(this.map)
  }
  searchLibrary(ev: any) {
    var searchlibrary: Array<any> = [];
    for (let i = 0; i < this.library.libraries.length; i++) {
      const library: string = this.library.libraries[i].library_Name.toLowerCase();

      if (library.includes(ev.target.value.toLowerCase())) {
        searchlibrary.push(this.library.libraries[i]);

      }
    }
    this.searchL = searchlibrary;
  }

  addMarker($event: any) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

}
