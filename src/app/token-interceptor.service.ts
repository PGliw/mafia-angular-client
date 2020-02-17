import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.userSession) {
      request = this.addToken(request, this.authService.userSession)
    }

    return next.handle(request).pipe(
      catchError(error => {
        if(error.status in [401, 403]){
          this.router.navigate(['login']);
        }
        return throwError(error)
      }
      )
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone(
      {
        setHeaders: {
          'user-session': token
        }
      }
    )
  }
  
}
