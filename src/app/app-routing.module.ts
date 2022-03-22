import { ManageStudentComponent } from './admin/manage-student/manage-student.component';
import { ManageEmployeeComponent } from './admin/manage-employee/manage-employee.component';
import { ManageLoaningComponent } from './admin/manage-loaning/manage-loaning.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { BooksComponent } from './books/books.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { ManageBookComponent } from './admin/manage-book/manage-book.component';
import { ManageLibraryComponent } from './admin/manage-library/manage-library.component';
import { ManageHomeComponent } from './admin/manage-home/manage-home.component';
import { RoleComponent } from './admin/role/role.component';
import { MessageComponent } from './admin/message/message.component';
const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "books",
    component: BooksComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "testimonial",
    component: TestimonialComponent
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
        path:"manageHome",
        component: ManageHomeComponent
      },
      {
        path:"manageLoaning",
        component: ManageLoaningComponent
      },
      {
        path:"manageEmployee",
        component: ManageEmployeeComponent
      },
      {
        path:"manageStudent",
        component: ManageStudentComponent
      },
      {      
        path:"manageRole",
        component: RoleComponent
      },
      {
        path:"contactMessage",
        component:MessageComponent
      }
    ]
  },
  {
    path: 'PageNotFound-404',
    component: PagenotfoundComponent
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/PageNotFound-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
