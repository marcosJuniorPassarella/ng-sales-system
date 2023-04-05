import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../models/interfaces/User/UserRequest';
import { AuthRequest } from '../../models/interfaces/User/auth/AuthRequest';
import { AuthResponse } from 'src/app/models/interfaces/User/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { UserInfo } from '../../models/interfaces/User/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  signUpUser(requestDatas: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`${this.API_URL}/user`, requestDatas);
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/session`,
      requestDatas
    );
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO');
    return JWT_TOKEN ? true : false;
  }

  getUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.API_URL}/me`, this.httpOptions);
  }
}
