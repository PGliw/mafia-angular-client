import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MafiaApiService, Debetor, Killer } from '../mafia-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userName: string;
  private debetors: Debetor[];
  private killers: Killer[];

  constructor(private authService: AuthService, private router: Router, private mafiaApiService: MafiaApiService) { }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.mafiaApiService.getDebetors().subscribe(
      debetors => {
        this.debetors = debetors;
      }
    )
    this.mafiaApiService.getKillers().subscribe(
      killers => {
        this.killers = killers;
      }
    )
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
