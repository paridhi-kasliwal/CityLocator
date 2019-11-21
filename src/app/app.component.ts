import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.getStateList();
  }

  getStateList() {
    this.stateService.getStateList().subscribe((data) => {
      this.allData = data;
      this.stateList = _.uniq(this.allData, function(d) {
        return d['State'];
      });
    });
  }

  getSelectedState(state) {
    this.currentState = state;
    this.cityList = _.filter(this.allData, function(d) {
      return d['State'] === state;
    });
  }
}
