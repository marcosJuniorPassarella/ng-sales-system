import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';

import { GetCategoriesResponse } from 'src/app/models/interfaces/Categories/GetCategoriesResponse';
import { DeleteCategoryAction } from 'src/app/models/interfaces/Categories/event/DeleteCategoryAction';
import { EventAction } from 'src/app/models/interfaces/event/EventAction';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: [],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  private ref!: DynamicDialogRef;
  categoriesDatas: Array<GetCategoriesResponse> = [];

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCategoriesDatas();
  }

  getCategoriesDatas(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.categoriesDatas = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar categorias!',
            life: 3000,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleCategoryAction(event: EventAction): void {
    if (event) {
      console.log(event);
    }
  }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (event) {
      console.log(event);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
