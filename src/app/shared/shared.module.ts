import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { ShortenPipe } from './pipes/shorten/shorten.pipe';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [ToolbarNavigationComponent, ShortenPipe],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // PrimeNg
    ToolbarModule,
    CardModule,
    ButtonModule,
  ],
  exports: [ToolbarNavigationComponent, ShortenPipe],
  providers: [DialogService]
})
export class SharedModule {}
