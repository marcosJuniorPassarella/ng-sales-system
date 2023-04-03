import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products/products.service';
import { AllProducts } from 'src/app/interfaces/Products/AllProducts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  userName!: string;
  productsList: Array<AllProducts> = [];

  productsChartDatas!: any;
  productsChartOptions!: any;
  categoriesChartDatas!: any;
  categoriesChartOptions!: any;


  constructor(
    private cookie: CookieService,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getUserName();
    this.getProductsDatas();
    this.setCategoriesChartConfig();
  }

  // Busca dados do usuário na API
  getUserName(): void {
    this.userService.getUserInfo()
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

  // Funcionalidade de logout de usuário
  logoutUser(): void {
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home']);
  }

  // Configura gráfico de produtos em estoque
  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      console.log(this.productsList.map((element) => element.amount))
      this.productsChartDatas = {
        labels: this.productsList.map((element) => element.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-600'),
            borderColor: documentStyle.getPropertyValue('--indigo-600'),
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
                weight: 500
              }
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false
            }
          }

        }
      };
    }
  }

  // Configura gráfico de categorias cadastradas
  setCategoriesChartConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.categoriesChartDatas = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: documentStyle.getPropertyValue('--pink-500'),
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.categoriesChartOptions = {
      indexAxis: 'y',
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
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
};

