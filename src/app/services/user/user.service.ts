import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../../interfaces/User/UserRequest';
import { AuthRequest } from '../../interfaces/User/AuthRequest';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = 'http://localhost:3333/v1'

  constructor(private http: HttpClient) { }

  signUpUser(requestDatas: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(
      `${this.API_URL}/user`,
      requestDatas
    )
  }

  authUser(requestDatas: AuthRequest): Observable<AuthRequest> {
    return this.http.post<AuthRequest>(
      `${this.API_URL}/session`,
      requestDatas
    )
  }
}
