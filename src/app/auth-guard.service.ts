import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate, UrlTree } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  // Login page is only available if user is not logged in
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/dashboard']);
    }
    return !this.authService.isLoggedIn;
  }
}
