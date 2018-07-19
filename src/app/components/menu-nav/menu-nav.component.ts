import { Component, ViewChild, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/store.reducers';
import * as StoreActions from '../../store/store.actions';
import { ICityData } from '../../store/store.reducers';

declare const google;

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss']
})
export class MenuNavComponent implements OnInit {
  @ViewChild('selectedCity') cityInput: any;
  public cities = ['Santiago', 'Buenos Aires', 'Lime', 'Sao Paulo'];
  public navStatus: string = 'closed';
  private selectedCity: any;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit(): void {
    setInterval(this.updateCityWeatherValues(), (60 * 3000));
    this.setAutoComplete();
  }

  private updateCityWeatherValues(): void {
    this.cities.forEach((city: string) => this.store.dispatch(new StoreActions.FetchTemps(city)));
  }

  private setAutoComplete(): void {
    const cityAutoComplete = new google.maps.places.Autocomplete(this.cityInput.nativeElement);
    cityAutoComplete.addListener('place_changed', () => {
      this.selectedCity = cityAutoComplete.getPlace();
      this.store.dispatch(new StoreActions.FetchTemps(this.selectedCity.name))
    });
  }

  public onToggleCollapse(): void {
    this.navStatus = this.navStatus === 'open' ? 'closed' : 'open';
  }

  public displayCityValues(city: string): void {
    this.store.select('citiesData').subscribe((data: ICityData[]) => {
      if (data) {
        const cityValue = data.find((cityData: ICityData) => cityData.cityName === city);
        if (!cityValue) {
          this.store.dispatch(new StoreActions.FetchTemps(city));
        } else {
          this.store.dispatch(new StoreActions.SetTemps(cityValue));
        }
      } else {
        this.store.dispatch(new StoreActions.FetchTemps(city));
      }
    });
  }
}
