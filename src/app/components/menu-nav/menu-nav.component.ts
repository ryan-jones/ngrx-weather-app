import { Component, ViewChild, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromWeather from '../../store/weatherStore/weather.reducers';
import * as StoreActions from '../../store/weatherStore/weather.actions';
import { take } from 'rxjs/operators';
import { ICityData } from '../../models/weather.model';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss'],
})
export class MenuNavComponent implements OnInit {
  @ViewChild('selectedCity') cityInput: any;
  public cities = ['Santiago', 'Buenos Aires', 'Lime', 'Sao Paulo'];
  public navStatus = false;
  public tempDropdown = false;
  public selectedCity = 'Santiago';

  constructor(private store: Store<fromWeather.State>) { }

  ngOnInit(): void {
    this.updateCityWeatherValues();
    setInterval(() => this.updateCityWeatherValues(), (60 * 3000));
  }

  private updateCityWeatherValues(): void {
    this.cities.forEach((city: string) => this.store.dispatch(new StoreActions.FetchTemps(city)));
  }

  public displayCityValues(city: string): void {
    this.store
      .pipe(
        select('weather'),
        take(1)
      )
      .subscribe((data: fromWeather.State) => this.updateCurrentCity(data, city));
  }

  private updateCurrentCity(data: fromWeather.State, city: string): void {
    if (data) {
      const cityValue: ICityData = data.citiesData.find((cityData: ICityData) => cityData.cityName === city);
      if (cityValue) {
        this.selectedCity = cityValue.cityName;
        this.store.dispatch(new StoreActions.ChangeCurrentCity(cityValue));
      }
    }
  }

  public onToggleCollapse = (): boolean => this.navStatus = !this.navStatus;
}
