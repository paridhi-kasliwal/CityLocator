import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  geocoder = new google.maps.Geocoder();
  map: google.maps.Map;
  @ViewChild('mapWrapper', {static: false}) mapElement: ElementRef;
  @Input() city: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.codeAddress(this.city);
  }

  codeAddress(city) {
    this.geocoder.geocode( { 'address': city}, function(results, status) {
      if (status == 'OK') {
        let latitude = results[0].geometry.location.lat();
        let longitude = results[0].geometry.location.lng();
        let latlng = new google.maps.LatLng(latitude, longitude);

        const mapOptions: google.maps.MapOptions = {
          zoom: 8,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map_' + city), mapOptions);
        this.map.setCenter(latlng);

        let marker = new google.maps.Marker({
          map: this.map,
          position: latlng,
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}