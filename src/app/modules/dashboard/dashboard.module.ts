import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ROUTES } from './dashboard.routing';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

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
    ChartModule,
    ButtonModule,
    ToolbarModule
  ],
  providers: [MessageService, CookieService],
})
export class DashboardModule { }
