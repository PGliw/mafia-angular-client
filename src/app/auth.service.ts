import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO use config file
  private readonly USER_SESSION_ = 'USER_SESSION';
  private readonly API_URL = 'http://localhost:8443/api';
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  signIn(user: { login: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.API_URL}/user/login`, user)
      .pipe(
        tap(tokens => console.log(tokens)),
        mapTo(true),
        catchError(error => {
          alert(error);
          console.log(error);
          return of(false)
        }
        )
      )
  }
}
