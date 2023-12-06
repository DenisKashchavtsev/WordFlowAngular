import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {TokenResponse} from "../models/responses/token-response";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _apiUrl: string = environment.apiUrl;
  private _token: string | null = null;
  private _refreshToken: string | null = null;

  constructor(private _http: HttpClient) {
  }

  setToken(token: string): void {
    this._token = token
    sessionStorage.setItem('token', token)
  }

  getToken(): string | null {
    if (sessionStorage.getItem('token')) {
      return sessionStorage.getItem('token');
    }

    return this._token;
  }

  setRefreshToken(refreshToken: string): void {
    this._refreshToken = refreshToken
    localStorage.setItem('refreshToken', refreshToken)
  }

  getRefreshToken(): string | null {
    if (this._refreshToken) {
      return this._refreshToken;
    }

    if (localStorage.getItem('refreshToken')) {
      return localStorage.getItem('refreshToken');
    }

    return null;
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post(`${this._apiUrl}auth/token/login`, {
      'email': email,
      'password': password
    });
  }

  refreshToken() {
    return this._http.post(`${this._apiUrl}auth/token/refresh`, {
      'refreshToken': this.getRefreshToken(),
    });
  }

  getCurrentUser(): Observable<any> {
    return this._http.get(`${this._apiUrl}users/me`);
  }
}
