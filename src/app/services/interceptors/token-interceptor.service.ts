import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, finalize, firstValueFrom, from, Observable, switchMap, throwError} from "rxjs";
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private _refreshTokenInProgress: boolean = false;

  constructor(private _authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this._authService.getToken() !== null) {
      req = this.addBearerToken(req)
    }

    // @ts-ignore
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !req.url.includes('api/auth') && error.status === 401) {
        return this.handle401Error(req, next);
      }

      return throwError(() => error);
    }));
  }

  async handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this._refreshTokenInProgress) {
      this._authService.refreshToken().pipe(
        switchMap((response: any) => {
          if (response && response.token && response.refreshToken) {
            this._authService.setToken(response.token);
            this._authService.setRefreshToken(response.refreshToken);
            return next.handle(this.addBearerToken(req));
          } else {
            return throwError(() => 'Invalid refresh token response');
          }
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          return throwError(() => error);
        }),
        finalize(() => {
          this._refreshTokenInProgress = false;
        })
      )
        .subscribe();
    }
  }

  addBearerToken(req: any) {
    return req.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + this._authService.getToken()
      }
    })
  }
}
