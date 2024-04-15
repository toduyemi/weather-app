import {
  groupBy,
  trimDate,
  getObjectKeys,
  getMostFrequent,
} from '../utilities/dataUtils';
import {
  Coordinates,
  ForecastCard,
  ForecastObj,
  WeatherCard,
} from '../types/appTypes.types';
import {
  ForecastResponse,
  GeoCityResponse,
  List,
  OneCallResponse,
} from '../types/openWeather.types';

// /*
// -dynamic function generator: returns a function that groups data based on the property (key) called in initial argument.
// -meant to be stored in a variable that will call this new function and take in arrays
// */
// export function groupBy(key: keyof ForecastData & keyof DescriptionData) {
//   /*
//   returned dynamic function that accepts arrays as argument
//   */
//   return function group(arr: Items) {
//     return arr.reduce<Group>((acc, currObj) => {
//       // create variable storing the value of the key of interest
//       const prop = currObj[key];
//       // destructure the rest of values into an array, extracting the date out since we don't need it anymore
//       // date should be key no? but typescript isnt making it easy
//       /*const { date, ...rest } = currObj;*/
//       //we check if it already contains an entry for that grouping criteria or start an empty array literal for it
//       acc[prop] = acc[prop] ||= [];
//       //finall we push into thisewly creared/existing property's value all the remaining properties stored inside the rest variable
//       acc[prop]?.push(currObj);
//       return acc;
//     }, {});
//   };
// }

export function createForecastArr(response: ForecastResponse): ForecastObj[] {
  const obj: ForecastObj[] = [];

  response?.list.forEach((item: List) => {
    let forecast: ForecastObj = {
      dt: item.dt,
      date: item.dt_txt,
      pop: item.pop,
      temp: item.main.temp,
      weather: item.weather[0],
      timezone_offset: response.city.timezone,
    };

    if (item.rain) forecast.rain = item.rain['3h'];
    if (item.snow) forecast.snow = item.snow['3h'];
    obj.push(forecast);
  });

  return obj;
} // parameter for forecast response object because the OneCallResponse does not carry the location name

export function parseCurrentWeather(
  response: OneCallResponse,
  foreResponse: ForecastResponse,
): WeatherCard {
  return {
    name: foreResponse.city.name,
    weather_id: response.current.weather[0].id,
    weather_condition: response.current.weather[0].description,
    weather_main: response.current.weather[0].main,
    weather_icon: response.current.weather[0].icon,
    dt: response.current.dt,
    temp: (Math.round(response.current.temp * 2) / 2).toFixed(),
    feels_like: (Math.round(response.current.feels_like * 2) / 2).toFixed(),
    timezone: response.timezone,
    country: foreResponse.city.country,
    highlights: {
      sunrise: response.current.sunrise,
      sunset: response.current.sunset,
      uvi: response.current.uvi,
      humidity: response.current.humidity,
      pressure: response.current.pressure,
      wind_speed: response.current.wind_speed,
      wind_deg: response.current.wind_deg,
      pop: response.hourly[0].pop,
      rain: response.current.rain?.['1h'] ?? 0,
      snow: response.current.snow?.['1h'] ?? 0,
      visibility: 0,
    },
  };
}
export function getCoord(response: GeoCityResponse[]): Coordinates {
  return {
    lat: response[0].lat,
    lon: response[0].lon,
  };
}
export function getHigh<T extends { temp: number }>(arr: T[]) {
  return arr.reduce((a, b) => (a < b.temp ? b.temp : a), arr[0].temp);
}
export function getLow<T extends { temp: number }>(arr: T[]) {
  return arr.reduce((a, b) => (a < b.temp ? a : b.temp), arr[0].temp);
}
export function parse5DayForecast(arr: ForecastObj[]) {
  const groupByDate = groupBy('date');

  const trimmed = trimDate(arr);

  const sorted = groupByDate(trimmed);

  const keys: string[] = getObjectKeys(sorted);

  const forecastWeather = {} as ForecastCard;
  for (const key of keys) {
    // let dailyDescriptions = litty[key].map((item) => item.weather.description);
    forecastWeather[key] = {
      temp_high: Math.round(getHigh(sorted[key])).toFixed(1),
      temp_low: Math.round(getLow(sorted[key])).toFixed(1),
      weather: getMostFrequent(sorted[key]),
      timestamp: sorted[key][0].dt,
      timezone_offset: sorted[key][0].timezone_offset,
    };
  }
  return forecastWeather;
}
