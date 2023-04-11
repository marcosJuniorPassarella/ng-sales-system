import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AllCategories } from 'src/app/models/interfaces/Categories/AllCategories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: [],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  categoriesDatas: Array<AllCategories> = [];
  selectedCategory: Array<{ name: string; code: string }> = [];
  productAction!: string;

  constructor(
    public ref: DynamicDialogConfig,
    private categoriesService: CategoriesService
  ) {}

  // Required datas to create product
  // name: string;
  // price: number;
  // description: string;
  // file: ?
  // category_id: string;
  // amount: number;

  ngOnInit(): void {
    this.productAction = this.ref.data?.action;
    this.productAction && console.log(this.productAction);
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.categoriesDatas = response;
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
