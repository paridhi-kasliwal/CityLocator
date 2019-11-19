import { Component, OnInit } from '@angular/core';
import { StateService } from './service/state.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  stateList: any = [];
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getStateList().subscribe((data) => {
      console.log('data', data, typeof data);
      this.stateList = data;
    })
  }

  getSelectedState(state) {
    console.log(state);
  }
}
