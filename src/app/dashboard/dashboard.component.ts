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
  private debtors: Debtor[];
  private killers: Killer[];
  private widgets: Widget[];
  private isEditing = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private debtorService: DebtorsService,
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
    this.debtorService.getDebtors().subscribe(
      debetors => this.debtors = debetors
    );
    this.killerService.getKillers().subscribe(
      killers => this.killers = killers
    );
  }

  logOut() {
    this.authService.logOut().subscribe(
      isLogoutSuccessful => {
        if (isLogoutSuccessful) {
          this.router.navigate(['login']);
        }
      }
    );
  }

  startEditing() {
    this.isEditing = true;
  }
  cancelEditing() {
    this.isEditing = false;
  }
  saveEditing() {
    this.isEditing = false;
  }

  // TODO move it to separate component and initially ???
  onVisibilityChange(value: string) {
    switch (value) {
      case 'debtors':
        console.log(0);
        break;
      case 'killers':
        console.log(1);
        break;
      case 'map':
        console.log(2);
        break;
    }
  }

}
