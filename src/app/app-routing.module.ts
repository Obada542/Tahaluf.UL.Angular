import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [

  {
    path: "home",
    component: HomeComponent
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
  }, { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: "security",
    loadChildren: () => AuthModule
  },
  {
    path: 'PageNotFound-404',
    component: PagenotfoundComponent
  },
  {path: '**', redirectTo: '/PageNotFound-404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
