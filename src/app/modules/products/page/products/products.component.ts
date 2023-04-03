import { Component, OnInit } from '@angular/core';
import { AllProducts } from 'src/app/interfaces/Products/AllProducts';
import { ProductsDataTransferService } from 'src/app/shared/services/products-data-transfer.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {
  productsDatas: Array<AllProducts> = [];
  productSelected!: AllProducts;

  constructor(private productsDtService: ProductsDataTransferService) { }

  ngOnInit(): void {
    this.getProductsDatas();
  }

  getProductsDatas(): void {
    const allProducts = this.productsDtService.getProductsDatas();
    allProducts && (this.productsDatas = allProducts);
    console.log(this.productsDatas);
  }
}
