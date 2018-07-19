import { Component, OnInit } from '@angular/core';
import * as fromState from '../../store/store.reducers';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public cityState: any;

  constructor(private store: Store<fromState.State>) { }

  ngOnInit(): void {
    this.store.subscribe((cityData: any) => {
      if (cityData.state.currentCityData.name) {
        this.cityState = cityData.state.currentCityData;
      }
    });
  }

}
