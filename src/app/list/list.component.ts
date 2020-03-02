import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
