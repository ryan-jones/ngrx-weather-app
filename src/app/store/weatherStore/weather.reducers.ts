import * as StoreActions from './weather.actions';
import { IWeatherData, ICityData } from '../../models/weather.model';
import * as moment from 'moment';

export interface State {
	citiesData: ICityData[];
	currentCityData: IWeatherData;
	selectedCity: string;
}

const initialState = {
	citiesData: [],
	currentCityData: {},
	selectedCity: 'Santiago'
};

export function storeReducer(state = initialState, action: StoreActions.StoreActions): State | any {
	let newState;
	switch (action.type) {
		case (StoreActions.SET_TEMPS):
			setNewCityData(state, action.payload);
			newState = {
				...state,
				currentCityData: action.payload
			};
			return newState;
		case (StoreActions.CHANGE_CURRENT_CITY):
			newState = {
				...state,
				currentCityData: action.payload.lastUpdatedWeather,
				selectedCity: action.payload.cityName
			};
			return newState;
		default:
			return state;
	}
}

export function setNewCityData(state = initialState, payload: IWeatherData): void {
	const { temp, temp_min, temp_max } = payload.main;
	const date = moment().format('HH:mm (DD/MM)');
	const weather = { date, temp, temp_max, temp_min };

	if (!state.citiesData.length) {
		addNewCityData(state, payload, weather);
		return;
	}
	checkForExistingCities(state, payload, weather);
}

export function checkForExistingCities(state = initialState, payload: IWeatherData, weather: any): void {
	const existingCity = state.citiesData.find((cityData: ICityData) => cityData.cityName === payload.name);
	existingCity
		? updateExistingCity(existingCity, payload, weather)
		: addNewCityData(state, payload, weather);
}

export function updateExistingCity(existingCity: ICityData, payload: IWeatherData, weather: any): void {
	existingCity.lastUpdatedWeather = payload;
	existingCity.temperatures.push(weather);
}

export function addNewCityData(state = initialState, payload: IWeatherData, weather: any): void {
	const weatherData: ICityData = {
		cityName: payload.name,
		lastUpdatedWeather: payload,
		temperatures: [weather]
	};
	state.citiesData.push(weatherData);
	state.currentCityData = payload;
}


