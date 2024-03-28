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
import { CitiesObj, Coordinates, ForecastObj, Units } from './appTypes.types';

import './style.css';
import { renderDailyCards } from './daily-forecast';
import { renderWeather } from './current-weather';
import { renderChart } from './dataCharts';
import { GeoDBCityResponse } from './geoDB.types';
import { autoSearch } from './autocomplete';
import { getElement, parseUnitState, updateDateTime } from './controller';

/*
-basic async function to hit api and return data of interest
-use url object methods to manipulate the sort of data returned
*/
class HTTPError extends Error {
  readonly response: any;
  readonly status: number;
  readonly statusText: string;

  constructor(status: number, statusText: string, response: any) {
    super(statusText);
    this.status = status;
    this.statusText = statusText;
    this.response = response;
  }
}
export const iconPath =
  './static/assets/weather-icons-master/production/line/openweathermap/';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/';
const GEO_CITIES_URL =
  'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/?sort=-population';

export async function fetchData<TData>({
  url,
  units,
  options,
}: {
  url: string;
  units?: string;
  options?: RequestInit;
}): Promise<TData> {
  const response = await fetch(url + (units ?? ''), options);

  if (!response.ok) {
    throw new HTTPError(response.status, response.statusText, response);
  }
  return await response.json();
}

export const url = {
  weather(coord: Coordinates) {
    if (!coord.lat || !coord.lon) {
      throw new Error();
    }
    return `${WEATHER_API_URL}weather?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  forecast(coord: Coordinates) {
    if (!coord.lat || !coord.lon) {
      throw new Error();
    }
    return `${WEATHER_API_URL}forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  geo(city: string = '', country: string = '') {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${process.env.API_KEY}`;
  },

  geoCities(city: string = '') {
    return GEO_CITIES_URL + `&namePrefix=${city}&limit=7`;
  },

  units(unit: Units = Units.metric) {
    return `&units=${unit}`;
  },
};

export async function fetchCities(query: string): Promise<CitiesObj[]> {
  const GEO_CITIES_KEY = 'fdd238edc7mshc7ce70a38dec71cp1f8681jsn7a6eaf6f76cd';
  const options = {
    headers: {
      'X-RapidAPI-Key': GEO_CITIES_KEY,
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };
  const cities = await fetchData<GeoDBCityResponse>({
    url: url.geoCities(query),
    options: options,
  });

  //debating whether to abstract away the below mapping step and just return api response
  return cities.data.map((city) => {
    return {
      label: {
        name: city.name,
        region: city.region,
        country: city.country,
        countryCode: city.countryCode,
      },
      coord: {
        lat: city.latitude,
        lon: city.longitude,
      },
    };
  });
}

let city = 'london';

let coord = {
  lat: '44.34',
  lon: '10.99',
};

// const geodb = await fetchCities('Lon');
// console.log(geodb);

// const geo = await fetchData<GeoCityResponse[]>({
//   url: url.geo(city),
//   units: url.units(),
// });
// console.log(geo);

setInterval(updateDateTime, 1000);

autoSearch();
// const responseFore = await fetchData<ForecastResponse>({
//   url: url.forecast(getCoord(geo)),
//   units: url.units(),
// });

// const responseWeath = await fetchData<WeatherResponse>({
//   url: url.weather(getCoord(geo)),
//   units: url.units(),
// });

// console.log(responseFore);

// console.log(responseWeath);
// const forecastArr = createForecastArr(responseFore);
// renderChart(forecastArr);
// const daily = parse5DayForecast(forecastArr);

// const today = parseCurrentWeather(responseWeath);
// console.log(today);

// renderDailyCards(daily);
// renderWeather(today);
// console.log(parse5DayForecast(forecastArr));

export async function refreshPage(coord: Coordinates, unitFlag: boolean) {
  const unitState = parseUnitState(unitFlag);
  const unitUrl = url.units(unitState);
  const responseFore = await fetchData<ForecastResponse>({
    url: url.forecast(coord),
    units: unitUrl,
  });

  const responseWeath = await fetchData<WeatherResponse>({
    url: url.weather(coord),
    units: unitUrl,
  });
  const forecastArr: ForecastObj[] = createForecastArr(responseFore);
  console.log(responseFore);

  renderChart(forecastArr);
  const daily = parse5DayForecast(forecastArr);

  const today = parseCurrentWeather(responseWeath);

  renderDailyCards(daily, unitState);
  renderWeather(today, unitState);
}
