import { ClientModule } from './client/client.module';
import { BookdetailsComponent } from './books/bookdetails/bookdetails.component';
import { BookComponent } from './books/book/book.component';
import { ManageStudentComponent } from './admin/manage-student/manage-student.component';
import { ManageEmployeeComponent } from './admin/manage-employee/manage-employee.component';
import { ManageLoaningComponent } from './admin/manage-loaning/manage-loaning.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ManageBookComponent } from './admin/manage-book/manage-book.component';
import { ManageLibraryComponent } from './admin/manage-library/manage-library.component';
import { ManageHomeComponent } from './admin/manage-home/manage-home.component';
import { MessageComponent } from './admin/message/message.component';
import { ManageWebsiteComponent } from './admin/manage-website/manage-website.component';
import { AccountantComponent } from './accountant/accountant.component';
import { DashboardaccComponent } from './accountant/dashboardacc/dashboardacc.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { ManageTestimonialsComponent } from './admin/manage-testimonials/manage-testimonials.component';
import { GetStudentComponent } from './accountant/get-student/get-student.component';
import { GetEmployeeComponent } from './accountant/get-employee/get-employee.component';
import { AuthorizationGuard } from './authorization.guard';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "books",
    component: BooksComponent,
    children: [
      {
        path: "",
        component: BookComponent
      }, {
        path: ":id",
        component: BookdetailsComponent
      },
    ]
  },

  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "security",
    loadChildren: () => AuthModule
  },
  {
    path: "client",
    loadChildren: () => ClientModule,
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "manageBook",
        component: ManageBookComponent
      },
      {
        path: "manageLibrary",
        component: ManageLibraryComponent
      },
      {
        path: "manageHome",
        component: ManageHomeComponent
      },
      {
        path: "manageLoaning",
        component: ManageLoaningComponent
      },
      {
        path: "manageEmployee",
        component: ManageEmployeeComponent
      },
      {
        path: "manageStudent",
        component: ManageStudentComponent
      },
      {
        path: "contactMessage",
        component: MessageComponent
      },
      {
        path: "manageWebsite",
        component: ManageWebsiteComponent
      },
      {
        path: "manageNews",
        component: ManageNewsComponent
      },

      {
        path: "manageTestimonial",
        component: ManageTestimonialsComponent
      }
    ],

    canActivate: [AuthorizationGuard]
  },

  {
    path: "accountant",
    component: AccountantComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        component: DashboardaccComponent
      },
      {
        path: "studentsInfo",
        component: GetStudentComponent
      },
      {
        path: "employeeInfo",
        component: GetEmployeeComponent
      },
    ],
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'PageNotFound-404',
    component: PagenotfoundComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/PageNotFound-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
