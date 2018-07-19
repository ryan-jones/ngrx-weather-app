import * as StoreActions from './store.actions';
import { IWeatherData } from '../models/weather.model';
import * as moment from 'moment';

export interface ICityTemp {
	date: any;
	temp: number;
	temp_max: number;
	temp_min: number;
}

export interface ICityData {
	cityName: string;
	lastUpdatedWeather: IWeatherData;
	temperatures: ICityTemp[];
}

export interface State {
	citiesData: ICityData[];
	currentCityData: IWeatherData;
}

const initialState = {
	citiesData: [],
	currentCityData: {}
}

export function storeReducer(state = initialState, action: StoreActions.StoreActions): any {
	switch (action.type) {
		case (StoreActions.SET_TEMPS):
			setNewCityData(state, action.payload);
			const newState = {
				...state,
				currentCityData: action.payload
			}
			return newState;
		default:
			return state;
	}
}

export function setNewCityData(state = initialState, payload: IWeatherData): void {
	const { temp, temp_min, temp_max } = payload.main;
	const date = moment().format('DD/MM/YYYY');
	const weather = { date, temp, temp_max, temp_min };

	if (!state.citiesData.length) {
		addNewCityData(state, payload, weather);
		return;
	};
	checkForExistingCities(state, payload, weather);
};

export function checkForExistingCities(state = initialState, payload: IWeatherData, weather: any): void {
	const existingCity = state.citiesData.find((cityData: ICityData) => cityData.cityName === payload.name);
	existingCity 
		? updateExistingCity(existingCity, payload, weather)
		: addNewCityData(state, payload, weather);
}

export function updateExistingCity(existingCity: ICityData, payload: IWeatherData, weather: any): void {
	existingCity.lastUpdatedWeather = payload;
	existingCity.temperatures.push(weather);
};

export function addNewCityData(state = initialState, payload: IWeatherData, weather: any): void {
	const weatherData: ICityData = {
		cityName: payload.name,
		lastUpdatedWeather: payload,
		temperatures: [weather]
	}
	state.citiesData.push(weatherData);
};

