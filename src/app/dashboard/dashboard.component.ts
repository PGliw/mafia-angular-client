import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DebetorsService, Debtor} from '../debtors.service';
import { KillersService, Killer } from '../killers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userName: string;
  private debetors: Debtor[];
  private killers: Killer[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private debetorsService: DebetorsService,
    private killerService: KillersService
    ) { }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.debetorsService.getDebetors().subscribe(
      debetors => {
        this.debetors = debetors;
      }
    );
    this.killerService.getKillers().subscribe(
      killers => {
        this.killers = killers;
      }
    );
  }

  logOut() {
    this.authService.logOut().subscribe(
      isLogoutSuccessfull => {
        if (isLogoutSuccessfull) {
          this.router.navigate(['login']);
        }
      }
    );
  }

}
