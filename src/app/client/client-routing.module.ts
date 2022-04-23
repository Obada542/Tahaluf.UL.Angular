import { TestimonialComponent } from './testimonial/testimonial.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: "payment",
    component: PaymentComponent
  },
  {
    path: "order-history",
    component: OrderHistoryComponent
  },
  {
    path: "testimonial",
    component: TestimonialComponent
  },{
    path:"myProfile",
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
