import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PaymentComponent,
    OrderHistoryComponent,
    TestimonialComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
