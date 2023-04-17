import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AllProducts } from 'src/app/models/interfaces/Products/AllProducts';
import { ProductRequest } from 'src/app/models/interfaces/Products/ProductRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<Array<AllProducts>> {
    return this.http.get<Array<AllProducts>>(
      `${this.API_URL}/products`,
      this.httpOptions
    );
  }

  public createProduct(
    requestDatas: ProductRequest
  ): Observable<ProductRequest> {
    return this.http.post<ProductRequest>(
      `${this.API_URL}/product`,
      requestDatas,
      this.httpOptions
    );
  }
}
