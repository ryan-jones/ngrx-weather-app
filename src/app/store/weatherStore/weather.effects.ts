import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromWeather from './weather.reducers';
import * as StoreActions from './weather.actions';
import { map, flatMap } from 'rxjs/operators';
import { IWeatherData } from '../../models/weather.model';

@Injectable()
export class StoreEffects {

	constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromWeather.State>) { }

	@Effect()
	cityFetch = this.actions$
		.ofType(StoreActions.FETCH_TEMPS)
		.pipe(
			map((action: StoreActions.FetchTemps) => action.payload),
			flatMap((cityName: string) => {
				const city: string = cityName.replace(/ /g, '+');
				return this.httpClient
					.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&type=accurate&APPID=b95560dee9268aece5f1aeb122da4aa5`);
			}),
			map((cityData: IWeatherData) => ({ type: StoreActions.SET_TEMPS, payload: cityData }))
		);
}
