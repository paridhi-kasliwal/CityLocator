import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { StateService } from './service/state.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  allData: any = [];
  stateList: any = [];
  cityList: any = [];
  currentState = 'Select State';
  geocoder = new google.maps.Geocoder();

  map: google.maps.Map;
  @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;
  
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getStateList().subscribe((data) => {
      this.allData = data;

      this.stateList = _.uniq(this.allData, function(d) {
        return d['State'];
      });
    });
  }

  initializeMap() {
    const lngLat = new google.maps.LatLng(6.5874964, 3.9886097);
    const mapOptions: google.maps.MapOptions = {
      center: lngLat,
      zoom: 16,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  getSelectedState(state) {
    this.currentState = state;
    this.stateService.getStateList(state).subscribe((data) => {
      this.cityList = data;

      _.each(this.cityList, (city) => {
        this.codeAddress(city['City']);
      });
      
      setTimeout(() => {
        this.initializeMap();
      }, 1000);
    });
  }

  codeAddress(city) {
    this.geocoder.geocode( { 'address': city}, function(results, status) {
      if (status == 'OK') {
        this.map.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
