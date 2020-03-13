import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-killer-info-dialog',
  templateUrl: './killer-info-dialog.component.html',
  styleUrls: ['./killer-info-dialog.component.css']
})
export class KillerInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
