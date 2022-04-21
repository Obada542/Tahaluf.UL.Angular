import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    PaymentComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
