import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { SidebarModule } from 'primeng/sidebar';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';

import { DashboardComponent } from './page/dashboard/dashboard.component';
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
    ChartModule,
    ButtonModule,
    ToolbarModule,
    CardModule
  ],
  providers: [MessageService, CookieService],
})
export class DashboardModule { }
