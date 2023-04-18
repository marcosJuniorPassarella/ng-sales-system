import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { EditProductRequest } from 'src/app/models/interfaces/Products/request/EditProductRequest';
import { environment } from 'src/environments/environment';
import { CreateProductRequest } from 'src/app/models/interfaces/Products/request/CreateProductRequest';
import { CreateProductResponse } from 'src/app/models/interfaces/Products/response/CreateProductResponse';
import { GetAllProductsResponse } from 'src/app/models/interfaces/Products/response/GetAllProductsResponse';

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

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(
      `${this.API_URL}/products`,
      this.httpOptions
    );
  }

  createProduct(
    requestDatas: CreateProductRequest
  ): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(
      `${this.API_URL}/product`,
      requestDatas,
      this.httpOptions
    );
  }

  editProduct(requestDatas: EditProductRequest): Observable<any> {
    return this.http.put<EditProductRequest>(
      `${this.API_URL}/product/edit`,
      requestDatas,
      this.httpOptions
    );
  }
}
