import { Component, OnInit } from '@angular/core';
import * as fromWeather from '../../store/weatherStore/weather.reducers';
import { Store } from '@ngrx/store';
import { WEATHER } from '../../utils/weather.utils';
import { IWeatherData, ICityData } from '../../models/weather.model';
import { textReveal } from '../../animations/home.animations';
import { createLineChartOpts } from '../../utils/chart.utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [textReveal]
})
export class HomeComponent implements OnInit {
  public cityState: IWeatherData;
  public backgroundImage: string;
  public tempChartOpts: any;

  constructor(private store: Store<fromWeather.State>) { }

  ngOnInit(): void {
    this.store.select('weather').subscribe((cityData: fromWeather.State) => {
      if (cityData.currentCityData.name) {
        if (!this.cityState || this.cityState.name !== cityData.selectedCity) {
          this.cityState = cityData.currentCityData;
        }
        this.setTempChart(cityData);
        this.setBackgroundImage();
      }
    });
  }

  private setTempChart(cityData: fromWeather.State): void {
    const temps = cityData.citiesData.find((city: ICityData) => city.cityName === this.cityState.name);
    this.tempChartOpts = createLineChartOpts(temps);
  }

  private setBackgroundImage(): void {
    let image = 'clear';
    const description = this.cityState.weather[0].description;

    WEATHER.forEach((type: string) => {
      const weatherType = new RegExp(type, 'i');
      if (description.match(weatherType)) {
        image = type;
      }
    });

    this.backgroundImage = `url('../../assets/images/${image}.jpg')`;
  }

}
