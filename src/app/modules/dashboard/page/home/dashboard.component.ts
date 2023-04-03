import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ChartData, ChartOptions } from 'chart.js';
import { UserService } from '../../../../services/user/user.service';
import { ProductsService } from 'src/app/services/products/products.service';
import { AllProducts } from 'src/app/interfaces/Products/AllProducts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  userName!: string;
  productsList: Array<AllProducts> = [];

  productsChartDatas!: ChartData;
  productsChartOptions!: ChartOptions;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.getUserDatas();
    this.getProductsDatas();
  }

  // Busca dados do usuário na API
  getUserDatas(): void {
    this.userService.getUserInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          response && (this.userName = response.name)
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar dados do usuário',
            life: 2000
          })
        }
      })
  }

  // Busca dados de produtos na API
  getProductsDatas(): void {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsList = response;
            this.productsList && this.setProductsChartConfig();

          }
        },
        error: (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao buscar produtos',
            life: 2000
          })
        }
      })
  }

  // Configura gráfico de produtos em estoque
  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.productsList.map((element) => element.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--yellow-400'),
            borderColor: documentStyle.getPropertyValue('--yellow-500'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--yellow-500'),
            data: this.productsList.map((element) => element.amount)
          }
        ]
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: '500'
              }
            },
            grid: {
              color: surfaceBorder,
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
            }
          }

        }
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
};

