import { TestimonialComponent } from './testimonial/testimonial.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentComponent } from './payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
