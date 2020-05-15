import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { Killer } from '../killers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-killers-list',
  templateUrl: './killers-list.component.html',
  styleUrls: ['./killers-list.component.css']
})
export class KillersListComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() items: Killer[];
  @Output() itemSelected = new EventEmitter<number>();
  @Output() addClicked = new EventEmitter();
  displayedColumns = ['pseudonym', 'salary', 'actions'];
  killersTable = new MatTableDataSource<Killer>([]);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.killersTable.sort = this.sort;
  }

  ngOnChanges() {
      if (this.items) {
        this.killersTable.data = this.items;
      }
  }

  itemLocationClicked(killer: Killer) {
    const index = this.items.findIndex(element => element === killer);
    this.itemSelected.emit(index);
  }

}
