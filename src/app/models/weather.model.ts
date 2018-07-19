export interface IWeatherData {
    coord: {
        lat: number;
        lon: number;
    },
    weather: IWeather[],
    base: string;
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    },
    visibility: number;
    wind: {
        speed: number;
        degrees: number
    },
    clouds: {
        all: number;
    },
    dt: number;
    sys: {
        type: number;
        id: number;
        message: number;
        country: string;
        sunrise: number;
        sunset: number;
    },
    id: number;
    name: string;
    cod: number;
}

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}