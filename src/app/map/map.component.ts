import { Component, OnInit, Input, AfterViewInit, DoCheck, OnChanges } from '@angular/core';
import { Debtor } from '../debtors.service';
import { Killer } from '../killers.service';
import Map from 'ol/map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import layerVector from 'ol/layer/Vector';
import sourceVector from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  map: Map;

  @Input() title: string;
  @Input() debtors: Debtor[];
  @Input() killers: Killer[];

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  // otherwise map is blank until resizing broswer window
  ngOnChanges() {
    if (this.map && this.debtors && this.killers) {
      this.addPoints();
      this.map.updateSize();
    }
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
        center: fromLonLat([17.038538, 51.107883]), // Wrocław
        zoom: 5
      })
    });
  }

  private addPoints() {
    const debotorsLocations = this.debtors.map(debtor => this.getCoordinates(debtor));
    const killerLocations = this.killers.map(killer => this.getCoordinates(killer));
    const debtorsSourceVector = this.locationsToPointsSourceVector(debotorsLocations, 'assets/images/red_star_transparent_small.png');
    const killersSourceVector = this.locationsToPointsSourceVector(killerLocations, 'assets/images/gun_small.png');
    const debtorsLayer = new layerVector({
      source: debtorsSourceVector
    });
    const killersLayer = new layerVector({
      source: killersSourceVector
    });
    this.map.addLayer(debtorsLayer);
    this.map.addLayer(killersLayer);
  }

  private locationsToPointsSourceVector(locations: number[][], iconPath: string) {
    const markers: Feature[] = locations.map(location => new Feature({
      geometry: new Point(fromLonLat(location))
    }));
    markers.forEach(marker => marker.setStyle(new Style({
      image: new Icon(
        {
          crossOrigin: 'anonymous',
          src: iconPath
        }
      )
    })));
    return new sourceVector(
      {
        features: markers
      }
    );
  }

  private getCoordinates(person: Debtor | Killer): number[] {
    return person.location.split('/').map(location => +location);
  }

}
