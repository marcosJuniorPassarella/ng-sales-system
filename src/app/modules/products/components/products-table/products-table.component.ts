import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/models/enums/Products/ProductEvent';
import { DeleteProductAction } from 'src/app/models/interfaces/Products/event/DeleteProductAction';
import { ProductAction } from 'src/app/models/interfaces/Products/event/ProductAction';
import { GetAllProductsRequest } from 'src/app/models/interfaces/Products/request/GetAllProductsRequest';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: [],
})
export class ProductsTableComponent {
  @Input() products: Array<GetAllProductsRequest> = [];
  @Output() productEvent = new EventEmitter<ProductAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  productSelected!: GetAllProductsRequest;
  addProductAction = ProductEvent.ADD_PRODUCT_ACTION;
  editProductAction = ProductEvent.EDIT_PRODUCT_ACTION;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== ' ') {
      const productEventData = id && id !== ' ' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      this.deleteProductEvent.emit({ product_id, productName });
    }
  }
}
