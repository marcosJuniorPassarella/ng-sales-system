import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AllProducts } from 'src/app/interfaces/Products/AllProducts';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  productsDataEmitter$ = new BehaviorSubject<any>(null);
  productsDatas: Array<AllProducts> = [];

  setProductsDatas(productsDatas: Array<AllProducts>): void {
    if (productsDatas) {
      this.productsDataEmitter$.next(productsDatas);
      this.getProductsDatas();
    }
  }

  getProductsDatas(): Array<AllProducts> {
    this.productsDataEmitter$.subscribe({
      next: (products: Array<AllProducts>) => {
        products && (this.productsDatas = products);
      }
    })
    return this.productsDatas;
  }

}
