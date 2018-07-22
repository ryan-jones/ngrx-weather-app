

import * as fromWeather from '../store/weatherStore/weather.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppStore {
	weather: fromWeather.State;
}

export const reducers: ActionReducerMap<AppStore> = {
	weather: fromWeather.storeReducer
};
