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
  @Input() selectedPerson: {
    index: number;
    personType: string
  };
  private debtorsMarkers: Feature[];
  private killersMarkers: Feature[];

  constructor() { }

  ngOnInit() {
    this.initializeMap();
  }

  // otherwise map is blank until resizing broswer window
  ngOnChanges() {
    if (this.map && this.debtors && this.killers) {
      const debotorsLocations = this.debtors.map(debtor => this.getCoordinates(debtor));
      const killersLocations = this.killers.map(killer => this.getCoordinates(killer));
      this.debtorsMarkers = this.locationsToFeatures(debotorsLocations, 'assets/images/red_star_transparent_small.png');
      this.killersMarkers = this.locationsToFeatures(killersLocations, 'assets/images/gun_small.png');
      this.addMarkers(this.debtorsMarkers);
      this.addMarkers(this.killersMarkers);
      this.map.updateSize();
    }
    if (this.selectedPerson) {
      console.log(this.selectedPerson);
      const index = this.selectedPerson.index;
      const personType = this.selectedPerson.personType;
      let marker;
      if (personType === 'Debtor') {
        marker = this.debtorsMarkers[index];
      } else if (personType === 'Killer') {
        marker = this.killersMarkers[index];
      }
      if (marker) {
        // this.map.getView().fit(marker.getGeometry(), this.map.getSize());
        // this.map.getView().centerOn(marker.getGeometry().getCoordinates(), this.map.getSize(), [570, 500]);
          this.map.getView().fit(marker.getGeometry(), {padding: [170, 50, 30, 150], maxZoom: 10});
      }
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

  private addMarkers(markers: Feature[]) {
    const debtorsLayer = new layerVector({
      source: new sourceVector(
        {
          features: markers
        }
      )
    });
    this.map.addLayer(debtorsLayer);
  }

  private locationsToFeatures(locations: number[][], iconPath: string): Feature[] {
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
    return markers;
  }

  private getCoordinates(person: Debtor | Killer): number[] {
    return person.location.split('/').map(location => +location);
  }

}
