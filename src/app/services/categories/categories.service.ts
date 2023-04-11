import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AllCategories } from 'src/app/models/interfaces/Categories/AllCategories';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.API_URL
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.JWT_TOKEN}`
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) { }

  getAllCategories(): Observable<Array<AllCategories>> {
    return this.http.get<Array<AllCategories>>(
      `${this.API_URL}/category/all`, this.httpOptions)
  }

}
