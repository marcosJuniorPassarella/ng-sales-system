import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AllProducts } from 'src/app/models/interfaces/Products/AllProducts';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [],
})
export class ProductsComponent implements OnInit {
  productsDatas: Array<AllProducts> = [];
  productSelected!: AllProducts;
  ref!: DynamicDialogRef;

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

  handleProduct(title: string, option: string): void {
    this.dialogService.open(ProductFormComponent, {
      header: title,
      data: {
        action: option,
      },
    });
  }
}
