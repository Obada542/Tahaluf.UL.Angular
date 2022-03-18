import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBookComponent } from './manage-book/manage-book.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageBookComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: []
})
export class AdminModule { }
