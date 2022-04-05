import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule,NgbCarouselModule, } from '@ng-bootstrap/ng-bootstrap';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { AgmCoreModule } from '@agm/core';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgbCarouselModule,
    NgChartsModule,
    NgxPaginationModule,
    PdfViewerModule,
    NgbModule,
    MatExpansionModule,
    MatTabsModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA41uiYMVyQ7KK5nFAO7QuexMj9_olgQIM'
    }),
    ShareButtonsModule,
    ShareIconsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgbCarouselModule,
    NgChartsModule,
    NgxPaginationModule,
    PdfViewerModule,
    NgbModule,
    MatExpansionModule,
    IvyCarouselModule,
    MatTabsModule,
    NgxSpinnerModule,
    AgmCoreModule,
    ShareButtonsModule,
    ShareIconsModule
  ]
})
export class SharedModule { }
