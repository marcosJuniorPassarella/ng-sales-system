import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductEvent } from 'src/app/models/enums/Products/ProductEvent';
import { GetAllProductsRequest } from 'src/app/models/interfaces/Products/request/GetAllProductsRequest';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  productsDatas: Array<GetAllProductsRequest> = [];
  productSelected!: GetAllProductsRequest;

  addProductAction = ProductEvent.ADD_PRODUCT_ACTION;
  editProductAction = ProductEvent.EDIT_PRODUCT_ACTION;

  constructor(
    private productsService: ProductsService,
    private productDataTransferService: ProductsDataTransferService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas(): void {
    const productsLoaded = this.productDataTransferService.getProductsDatas();
    if (productsLoaded) {
      this.productsDatas = productsLoaded;
    }
  }

  getAPIProductsDatas(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 3000,
          });
        },
      });
  }

  handleProduct(action: string, id?: string): void {
    this.ref = this.dialogService.open(ProductFormComponent, {
      header: action,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        event: { action, id },
      },
    });

    this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.getAPIProductsDatas(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
