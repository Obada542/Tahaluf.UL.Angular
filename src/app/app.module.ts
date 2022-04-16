import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SharedModule } from './shared/shared.module';
import { ContactComponent } from './contact/contact.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BooksComponent } from './books/books.component';
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
import { ManageWebsiteComponent } from './admin/manage-website/manage-website.component';
import { AccountantComponent } from './accountant/accountant.component';
import { DashboardaccComponent } from './accountant/dashboardacc/dashboardacc.component';
import { ManageTestimonialsComponent } from './admin/manage-testimonials/manage-testimonials.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { BookComponent } from './books/book/book.component';
import { BookdetailsComponent } from './books/bookdetails/bookdetails.component';
import { GetStudentComponent } from './accountant/get-student/get-student.component';
import { GetEmployeeComponent } from './accountant/get-employee/get-employee.component';
import { TokenInterceptor } from './Interceptor/token.interceptor';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastNoAnimationModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart.component';

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
    BookComponent,
    BookdetailsComponent,
    GetStudentComponent,
    GetEmployeeComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    SharedModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot(
      {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ] ,
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
