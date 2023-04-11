import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllProducts } from 'src/app/models/interfaces/Products/AllProducts';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductEvent } from 'src/app/models/enums/Products/ProductEvent';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [],
})
export class ProductsComponent implements OnInit {
  productsDatas: Array<AllProducts> = [];
  productSelected!: AllProducts;

  addProductEvent = {
    title: ProductEvent.ADD_PRODUCT_TITLE,
    action: ProductEvent.ADD_PRODUCT_EVENT,
  };
  editProductEvent = {
    title: ProductEvent.EDIT_PRODUCT_TITLE,
    action: ProductEvent.EDIT_PRODUCT_EVENT,
  };

  constructor(
    private productsDtService: ProductsDataTransferService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    const allProducts = this.productsDtService.getProductsDatas();
    allProducts && (this.productsDatas = allProducts);
    console.log(this.productsDatas);
  }

  handleProduct(productEvent: { title: string; action: string }): void {
    this.dialogService.open(ProductFormComponent, {
      header: productEvent.title,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: {
        action: productEvent.action,
      },
    });
  }
}
