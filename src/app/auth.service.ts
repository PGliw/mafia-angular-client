import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, mapTo, catchError } from 'rxjs/operators';

export interface LoginResponse {
  id: number;
  login: string;
  name: string;
  lastName: string;
  userSession: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO use config file
  private readonly USER_SESSION = 'USER_SESSION';
  private readonly LOGIN = 'LOGIN';
  private readonly ID = 'ID';
  private readonly API_URL = 'http://localhost:8443/api';
  private readonly NAME = 'FIRST_NAME';
  private readonly LAST_NAME = 'LAST_NAME';
  private loggedUser: string;

  constructor(private http: HttpClient) { }

  signIn(user: { login: string, password: string }): Observable<boolean> {
    return this.http.post<LoginResponse>(`${this.API_URL}/user/login`, user)
      .pipe(
        tap(loginResponse => this.storeLoginResponse(loginResponse)),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return of(false);
        }
        )
      );
  }

  logOut() {
    const user = {
      login: localStorage.getItem(this.LOGIN),
      id: localStorage.getItem(this.ID)
    };
    return this.http.put<any>(`${this.API_URL}/user/logout`, user)
      .pipe(
        tap(() => this.removeLoginResponse()),
        mapTo(true),
        catchError(error => {
          this.handleError(error);
          return of(false);
        }
        )
      );
  }

  get userName() {
    return `${localStorage.getItem(this.NAME)} ${localStorage.getItem(this.LAST_NAME)}`;
  }

  get isLoggedIn() {
    // returns true if userSession is not null, else - false
    return !!this.userSession;
  }

  get userSession() {
    return localStorage.getItem(this.USER_SESSION);
  }

  get userId() {
    return localStorage.getItem(this.ID);
  }

  private handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      alert(`${error.message}`);
    } else {
      alert(error); // TODO
    }
  }

  private storeLoginResponse(loginResponse: LoginResponse) {
    localStorage.setItem(this.USER_SESSION, loginResponse.userSession);
    localStorage.setItem(this.LOGIN, loginResponse.login);
    localStorage.setItem(this.ID, loginResponse.id.toString());
    localStorage.setItem(this.NAME, loginResponse.name);
    localStorage.setItem(this.LAST_NAME, loginResponse.lastName);
  }

  private removeLoginResponse() {
    localStorage.removeItem(this.USER_SESSION);
    localStorage.removeItem(this.LOGIN);
    localStorage.removeItem(this.ID);
    localStorage.removeItem(this.NAME);
    localStorage.removeItem(this.LAST_NAME);
  }
}
