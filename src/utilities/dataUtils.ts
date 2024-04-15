import { ForecastObj } from '../types/appTypes.types';

//trim Date/time string to date. (YYYY-MM-dd hh:mm:ss) => YYYY-MM-dd
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
export function getObjectKeys<T extends Record<string, unknown>>(
  object: T,
): Array<keyof T> {
  return Object.keys(object);
}

export function getAverage(arr: number[], isRound = true) {
  let average = 0;
  if (isRound) {
    average = Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }
  else average = +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2);

  return average;
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
