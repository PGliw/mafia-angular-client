import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DebtorsService, Debtor } from '../debtors.service';
import { KillersService, Killer } from '../killers.service';
import { Widget, DashboardService } from '../dashboard.service';
import { FormBuilder, FormGroup } from '@angular/forms';

interface WidgetOption {
  type: number;
  title: string;
  checked: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string;
  debtors: Debtor[];
  killers: Killer[];
  widgets: Widget[];
  selected: Debtor | Killer;
  isEditing = false;
  widgetOptions: WidgetOption[] = [
    {
      type: 0,
      title: 'Dłużnicy',
      checked: null
    },
    {
      type: 1,
      title: 'Zabójcy',
      checked: null
    },
    {
      type: 2,
      title: 'Mapa',
      checked: null
    }
  ];
  private oldWidgetOptions: WidgetOption[];

  static clone(array: any[]) {
    return array.map(obj => Object.assign({}, obj));
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private debtorService: DebtorsService,
    private killerService: KillersService,
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.userName = this.authService.userName;
    this.dashboardService.getWidgets(+this.authService.userId).subscribe(
      widgets => {
        this.widgets = widgets;
        const widgetOptionsToBeChecked = this.widgetOptions.filter(wo => wo.type in widgets.map(w => w.type));
        widgetOptionsToBeChecked.forEach(wo => wo.checked = true);
      }
    );
    this.debtorService.getDebtors().subscribe(
      debtors => this.debtors = debtors
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

  changeChecked(widgetOption: WidgetOption, $event) {
    const option = this.widgetOptions.find(wo => wo.type === widgetOption.type);
    option.checked = $event.checked;
  }

  startEditing() {
    this.isEditing = true;
    this.oldWidgetOptions = DashboardComponent.clone(this.widgetOptions);
  }

  cancelEditing() {
    this.widgetOptions = DashboardComponent.clone(this.oldWidgetOptions); // undo changes to widgets
    this.isEditing = false;
  }

  saveEditing() {
    this.isEditing = false;
  }

  isWidgetVisible(widget: Widget) {
    return this.widgetOptions.find(wo => wo.type === widget.type).checked;
  }

  get debtorsItems() {
    if (this.debtors) { return this.debtors.map(debtor => `${debtor.name} ${debtor.lastname} - ${debtor.debt}`); }
  }

  get killersItems() {
    if (this.killers) { return this.killers.map(killer => `${killer.pseudonym} - ${killer.salary}`); }
  }

  locationChanged(index: number) {
    // alert(index);
    this.selected = this.debtors[index];
  }
}
