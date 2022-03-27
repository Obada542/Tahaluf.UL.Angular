import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SharedModule } from './shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule,NgbCarouselModule, } from '@ng-bootstrap/ng-bootstrap';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { JwPaginationModule } from 'jw-angular-pagination';
import { BooksComponent } from './books/books.component';
import {MatSelectModule} from '@angular/material/select';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageBookComponent } from './admin/manage-book/manage-book.component';
import { AdminComponent } from './admin/admin.component';
import { ManageLibraryComponent } from './admin/manage-library/manage-library.component';
import { ManageHomeComponent } from './admin/manage-home/manage-home.component';
import { ManageLoaningComponent } from './admin/manage-loaning/manage-loaning.component';
import { ManageEmployeeComponent } from './admin/manage-employee/manage-employee.component';
import { ManageStudentComponent } from './admin/manage-student/manage-student.component';
import { RoleComponent } from './admin/role/role.component';
import { MessageComponent } from './admin/message/message.component';
import { DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { ManageWebsiteComponent } from './admin/manage-website/manage-website.component';
import { AccountantComponent } from './accountant/accountant.component';
import { DashboardaccComponent } from './accountant/dashboardacc/dashboardacc.component';
import { NgChartsModule } from 'ng2-charts';
import { ManageTestimonialsComponent } from './admin/manage-testimonials/manage-testimonials.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { GetStudentComponent } from './accountant/get-student/get-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    TestimonialComponent,
    PagenotfoundComponent,
    BooksComponent,
    DashboardComponent,
    ManageBookComponent,
    AdminComponent,
    ManageLibraryComponent,
    ManageHomeComponent,
    ManageLoaningComponent,
    ManageEmployeeComponent,
    ManageStudentComponent,
    RoleComponent,
    MessageComponent,
    ManageWebsiteComponent,
    AccountantComponent,
    DashboardaccComponent,
    ManageTestimonialsComponent,
    ManageNewsComponent,
    GetStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule,
    IvyCarouselModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    HttpClientModule,
    JwPaginationModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    NgbCarouselModule,
    NgChartsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
