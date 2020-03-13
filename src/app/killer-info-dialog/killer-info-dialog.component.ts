import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LocationChoiceDialogComponent } from '../location-choice-dialog/location-choice-dialog.component';

@Component({
  selector: 'app-killer-info-dialog',
  templateUrl: './killer-info-dialog.component.html',
  styleUrls: ['./killer-info-dialog.component.css']
})
export class KillerInfoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DashboardComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onLocationClick() {
    this.dialog.open(LocationChoiceDialogComponent, {width: '700px', height: 'auto'});
  }

}
