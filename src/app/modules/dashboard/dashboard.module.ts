import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';

import { ROUTES } from './dashboard.routing';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    // PrimeNG
    SidebarModule,
    ChartModule
  ]
})
export class DashboardModule { }
