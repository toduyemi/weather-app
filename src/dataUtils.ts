import {
  Coordinates,
  ForecastCard,
  ForecastObj,
  WeatherCard,
} from './appTypes.types';
import {
  WeatherResponse,
  ForecastResponse,
  List,
  GeoCityResponse,
} from './openWeather.types';
import { fromUnixTime } from 'date-fns';

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
    };

    if (item.rain) forecast.rain = item.rain['3h'];
    if (item.snow) forecast.snow = item.snow['3h'];
    obj.push(forecast);
  });

  return obj;
}
// export function createChartForeCast(response: ForecastResponse) {
//   const obj = [];

//   response.list.forEach((item: List) => {
//     let forecast = {
//       dt: item.dt,
//       date: item.dt_txt,
//       temp: item.main.temp
//     }
//   })
// }
export function parseCurrentWeather(response: WeatherResponse): WeatherCard {
  return {
    name: response.name,
    weather_id: response.weather[0].id,
    weather_condition: response.weather[0].description,
    weather_main: response.weather[0].main,
    weather_icon: response.weather[0].icon,
    date: fromUnixTime(response.dt).toDateString(),
    temp: (Math.round(response.main.temp * 2) / 2).toFixed(1),
    feels_like: (Math.round(response.main.feels_like * 2) / 2).toFixed(1),
    timezone: response.timezone,
  };
}
// export function createDescriptionArr(data: ForecastObj[]): DescriptionObj[] {
//   const obj: DescriptionObj[] = [];

//   data?.forEach((item) => {
//     let description = {
//       date: item.date,
//       temp: item.main.temp,
//       weather: item.weather[0],
//     };
//     obj.push(forecast);
//   });

//   return obj;
// }

//IT WORKED
export function trimDate(data: ForecastObj[]): ForecastObj[] {
  const forecast: ForecastObj[] = [];

  data.map((item) => {
    // objects are passed by reference so clone object to prevent mutation of original
    item = JSON.parse(JSON.stringify(item));

    item.date = item.date.substring(0, 10);
    forecast.push(item);
  });

  return forecast;
}

// K is the key that we're going to group by (e.g. date)
export function groupBy<K extends string>(key: K) {
  // T is the full object data, must have the specified key (with a string value)
  return function group<T extends Record<K, string>>(arr: T[]) {
    // The result type is an object with string keys, an./d the value is an array of "T" items... but with K removed.
    return arr.reduce<Record<string, Array<Omit<T, K>>>>((acc, currObj) => {
      const { [key]: prop, ...rest } = currObj;
      const group = (acc[prop] ||= []);
      group.push(rest);

      return acc;
    }, {});
  };
}

//DONE
export function getObjectKeys<T extends {}>(object: T): Array<keyof T> {
  return Object.keys(object) as Array<keyof T>;
}

export function getAverage(arr: number[], isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }
  else average = +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

  return average;
}

export function getHigh<T extends { temp: number }>(arr: T[]) {
  return arr.reduce((a, b) => (a < b.temp ? b.temp : a), arr[0].temp);
}

export function getLow<T extends { temp: number }>(arr: T[]) {
  return arr.reduce((a, b) => (a < b.temp ? a : b.temp), arr[0].temp);
}

/*
- counts id property because that appears to be the primary key for weather conditions
- the other two weather properties can be extracted from json data map
*/
export function getMostFrequent<T extends { weather: { id: number } }>(
  obj: T[],
) {
  //create hash of amount of times each id value appears in array of date
  const hashmap = obj.reduce(
    (acc, val) => {
      let valWeather = val.weather.id;

      acc[valWeather] = (acc[valWeather] || 0) + 1;
      return acc;
    },
    {} as { [id: string]: number },
  );

  // return hash value with highest number
  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b,
  );
}

export function parse5DayForecast(arr: ForecastObj[]) {
  const groupByDate = groupBy('date');

  const trimmed = trimDate(arr);
  // console.log(trimmed);

  const sorted = groupByDate(trimmed);
  // console.log(sorted);

  const keys: string[] = getObjectKeys(sorted);

  const forecastWeather = {} as ForecastCard;
  for (const key of keys) {
    // let dailyDescriptions = litty[key].map((item) => item.weather.description);
    forecastWeather[key] = {
      temp_high: Math.round(getHigh(sorted[key])).toFixed(1),
      temp_low: Math.round(getLow(sorted[key])).toFixed(1),
      weather: getMostFrequent(sorted[key]),
    };
  }

  return forecastWeather;
}

export function getCoord(response: GeoCityResponse[]): Coordinates {
  return {
    lat: response[0].lat,
    lon: response[0].lon,
  };
}

// export function getMostFrequent<T extends {}>(obj: T) {
//   const hashmap = item.reduce((acc, val) => {

//     acc[val] = (acc[val] || 0) + 1;
//     return acc;
//   }, {});

//   return Object.keys(hashmap).reduce((a, b) =>
//     hashmap[a] > hashmap[b] ? a : b,
//   );
// }

//TODO
export function createTodayWeather(weatherResponse: object) {
  // return {
  //   currentTemp: weatherResponse.main.temp,
  //   feelsLike: weatherResponse.main.feels_like,
  // };
}
