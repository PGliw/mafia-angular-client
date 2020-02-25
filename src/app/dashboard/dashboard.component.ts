import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DebtorsService, Debtor } from '../debtors.service';
import { KillersService, Killer } from '../killers.service';
import { Widget, DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private userName: string;
  private debetors: Debtor[];
  private killers: Killer[];
  private widgets: Widget[];

  private myPos = {
    top: 5,
    left: 5,
    height: 1,
    width: 1
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private debetorsService: DebtorsService,
    private killerService: KillersService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.dashboardService.getWidgets(+this.authService.userId).subscribe(
      widgets => {
        this.widgets = widgets;
        console.log(widgets);
      }
    );
    this.debetorsService.getDebetors().subscribe(
      debetors => this.debetors = debetors
    );
    this.killerService.getKillers().subscribe(
      killers => this.killers = killers
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
