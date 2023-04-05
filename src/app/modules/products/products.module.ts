import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';

import { ProductsComponent } from './page/products/products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PRODUCTS_ROUTES } from './products.routing';
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    SharedModule,
    // PrimeNg
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
  ],
  providers: [DialogService],
})
export class ProductsModule {}
