import {
  getCoord,
  parseCurrentWeather,
  parse5DayForecast,
  createForecastArr,
} from './dataUtils';
import {
  WeatherResponse,
  GeoCityResponse,
  ForecastResponse,
} from './openWeather.types';
import { Coordinates } from './appTypes.types';

import './style.css';
import { renderDailyCards } from './daily-forecast';
import { renderWeather } from './current-weather';
import { renderChart } from './dataCharts';

/*
-basic async function to hit api and return data of interest
-use url object methods to manipulate the sort of data returned
*/
export async function fetchData<TData>(
  url: string,
  units: string,
): Promise<TData> {
  const response = await fetch(url + units, { mode: 'cors' });
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
enum Units {
  metric = 'metric',
  imperial = 'imperial',
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
  units(unit: Units = Units.metric) {
    return `&units=${unit}`;
  },
};
let city = 'alliston';

let coord = {
  lat: '44.34',
  lon: '10.99',
};

const geo = await fetchData<GeoCityResponse[]>(url.geo(city), url.units());
console.log(geo);

const responseFore = await fetchData<ForecastResponse>(
  url.forecast(getCoord(geo)),
  url.units(),
);

const responseWeath = await fetchData<WeatherResponse>(
  url.weather(getCoord(geo)),
  url.units(),
);

console.log(responseFore);

console.log(responseWeath);
const forecastArr = createForecastArr(responseFore);
renderChart(forecastArr);
const daily = parse5DayForecast(forecastArr);

const today = parseCurrentWeather(responseWeath);
console.log(today);

renderDailyCards(daily);
renderWeather(today);
console.log(parse5DayForecast(forecastArr));
