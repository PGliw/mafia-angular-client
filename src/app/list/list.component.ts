import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() title: string;
  @Input() items: string[];
  @Input() actionTile: string;
  @Input() actionIcon: string;
  @Output() itemSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  itemLocationClicked(index: number) {
    this.itemSelected.emit(index);
  }

}
