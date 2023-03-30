import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../interfaces/User/UserRequest';
import { AuthRequest } from '../../interfaces/User/auth/AuthRequest';
import { AuthResponse } from 'src/app/interfaces/User/auth/AuthResponse';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:3333/v1'

  constructor(private http: HttpClient, private cookie: CookieService) { }

  signUpUser(requestDatas: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(
      `${this.API_URL}/user`,
      requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.API_URL}/session`,
      requestDatas
    )
  }

  isLoggedIn(): boolean {
    const JWT_TOKEN = this.cookie.get('USER_INFO')
    console.log('token do usuário', JWT_TOKEN);
    return JWT_TOKEN ? true : false;
  }
}
