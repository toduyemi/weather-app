import { getCoord, parseCurrentWeather, parse5DayForecast } from './dataUtils';
import {
  WeatherResponse,
  GeoCityResponse,
  ForecastResponse,
} from './openWeather.types';
import { Coordinates } from './appTypes.types';

import './style.css';
import { renderDailyCards } from './daily-forecast';
import { renderWeather } from './current-weather';

/*
-basic async function to hit api and return data of interest
-use url object methods to manipulate the sort of data returned
*/
export async function fetchData<TData>(url: string): Promise<TData> {
  const response = await fetch(url, { mode: 'cors' });
  try {
    if (response.ok) {
      return await response.json();
    }
    else {
      throw new Error();
    }
  }
  catch (error) {
    alert(error);
    throw error;
  }
}

export const url = {
  weather(coord: Coordinates) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  forecast(coord: Coordinates) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  geo(city: string = '', country: string = '') {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${process.env.API_KEY}`;
  },
};
let city = 'alliston';

let coord = {
  lat: '44.34',
  lon: '10.99',
};

const geo = await fetchData<GeoCityResponse[]>(url.geo(city));
console.log(geo);

const responseFore = await fetchData<ForecastResponse>(
  url.forecast(getCoord(geo)),
);

const responseWeath = await fetchData<WeatherResponse>(
  url.weather(getCoord(geo)),
);

console.log(responseFore);
console.log(responseWeath);

const daily = parse5DayForecast(responseFore);

const today = parseCurrentWeather(responseWeath);
console.log(today);

renderDailyCards(daily);
renderWeather(today);
console.log(parse5DayForecast(responseFore));
