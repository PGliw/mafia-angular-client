import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Killer } from '../killers.service';

@Component({
  selector: 'app-killers-list',
  templateUrl: './killers-list.component.html',
  styleUrls: ['./killers-list.component.css']
})
export class KillersListComponent implements OnInit {

  @Input() title: string;
  @Input() items: Killer[];
  @Input() actionTile: string;
  @Input() actionIcon: string;
  @Output() itemSelected = new EventEmitter<number>();
  @Output() addClicked = new EventEmitter();
  displayedColumns = ['pseudonym', 'salary', 'actions'];

  constructor() { }

  ngOnInit() {
  }

  itemLocationClicked(index: number) {
    this.itemSelected.emit(index);
  }

}
