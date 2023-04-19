import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { ProductEvent } from 'src/app/models/enums/Products/ProductEvent';
import { AllCategories } from 'src/app/models/interfaces/Categories/AllCategories';
import { ProductAction } from 'src/app/models/interfaces/Products/event/ProductAction';
import { CreateProductRequest } from 'src/app/models/interfaces/Products/request/CreateProductRequest';
import { EditProductRequest } from 'src/app/models/interfaces/Products/request/EditProductRequest';
import { GetAllProductsResponse } from 'src/app/models/interfaces/Products/response/GetAllProductsResponse';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  categoriesDatas: Array<AllCategories> = [];
  selectedCategory: Array<{ name: string; code: string }> = [];
  productAction!: {
    event: ProductAction;
    productDatas: Array<GetAllProductsResponse>;
  };
  productSelectedDatas!: GetAllProductsResponse;

  addProductAction = ProductEvent.ADD_PRODUCT_ACTION;
  editProductAction = ProductEvent.EDIT_PRODUCT_ACTION;

  addProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: ['', Validators.required],
  });

  editProductForm = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
  });

  constructor(
    public ref: DynamicDialogConfig,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productAction = this.ref.data;
    console.log(this.productAction);
    if (
      this.productAction?.event?.action === this.editProductAction &&
      this.productAction.productDatas
    ) {
      this.getProductSelectedDatas(this.productAction?.event.id as string);
    }
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            response.length > 0 && (this.categoriesDatas = response);
          }
        },
      });
  }

  getProductSelectedDatas(productId: string): void {
    const allProducts = this.productAction?.productDatas;
    if (allProducts) {
      const productFiltered = allProducts.filter(
        (element) => element?.id === productId
      );

      if (productFiltered) {
        this.productSelectedDatas = productFiltered[0];

        this.editProductForm.setValue({
          name: this.productSelectedDatas?.name,
          price: this.productSelectedDatas?.price,
          amount: this.productSelectedDatas?.amount,
          description: this.productSelectedDatas?.description,
        });
      }
    }
  }

  handleSubmitAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: Number(this.addProductForm.value.amount),
      };

      this.productsService
        .createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            response &&
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto criado com sucesso!',
                life: 3000,
              });
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar produto!',
              life: 3000,
            });
            this.addProductForm.reset();
          },
        });

      this.addProductForm.reset();
    }
  }

  handleSubmitEditProduct(): void {
    if (
      this.editProductForm.value &&
      this.editProductForm.valid &&
      this.productAction.event.id
    ) {
      const requestEditProduct: EditProductRequest = {
        name: this.editProductForm.value.name as string,
        price: this.editProductForm.value.price as string,
        description: this.editProductForm.value.description as string,
        product_id: this.productAction.event.id,
        amount: this.editProductForm.value.amount as number,
      };

      this.productsService
        .editProduct(requestEditProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            response &&
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Produto editado com sucesso!',
                life: 3000,
              });
            this.editProductForm.reset();
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar produto!',
              life: 3000,
            });
            this.editProductForm.reset();
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
