import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut(){
    this.authService.logOut().subscribe(
      isLogoutSuccessfull => {
        if(isLogoutSuccessfull){
          this.router.navigate(['login']);
        }
      }
    );
  }

}
