import { Action } from '@ngrx/store';
import { IWeatherData, ICityData } from '../../models/weather.model';

export const FETCH_TEMPS = 'FETCH_TEMPS';
export const SET_TEMPS = 'SET_TEMPS';
export const CHANGE_CURRENT_CITY = 'CHANGE_CURRENT_CITY';

export class FetchTemps implements Action {
	readonly type = FETCH_TEMPS;
	constructor(public payload: string) { }
}

export class SetTemps implements Action {
	readonly type = SET_TEMPS;
	constructor(public payload: IWeatherData) { }
}

export class ChangeCurrentCity implements Action {
	readonly type = CHANGE_CURRENT_CITY;
	constructor(public payload: ICityData) {}
}

export type StoreActions = FetchTemps | SetTemps | ChangeCurrentCity;
