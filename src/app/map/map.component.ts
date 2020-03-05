import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Debtor } from '../debtors.service';
import { Killer } from '../killers.service';
import Map from 'ol/map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  map: Map;

  @Input() title: string;
  @Input() debtors: Debtor[];
  @Input() killers: Killer[];

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  ngAfterViewInit() {
    this.map.updateSize();
  }

  private initializeMap() {
    this.map = new Map({
      target: 'map-container',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: [37.4, 8.82],
        zoom: 4
      })
    });
  }

  getCoordinates(person: Debtor | Killer): string[] {
    return person.location.split('/');
  }

}
