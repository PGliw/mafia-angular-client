import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

    // Dashboard page is only available if user is logged in
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    return this.authService.isLoggedIn
  }

}
