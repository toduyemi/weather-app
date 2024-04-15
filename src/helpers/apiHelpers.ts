import { CitiesObj, Coordinates, Units } from '../types/appTypes.types';
import { GeoDBCityResponse } from '../types/geoDB.types';
import { fetchData } from '../utilities/apiUtilities';

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
export const iconPath =
  './static/assets/weather-icons-master/production/line/openweathermap/';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/';
export const GEO_CITIES_URL =
  'https://wft-geo-db.p.rapidapi.com/v1/geo/cities/?sort=-population';
export const url = {
  weather(coord: Coordinates) {
    if (!coord.lat || !coord.lon) {
      throw new Error();
    }
    return `${WEATHER_API_URL}3.0/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  forecast(coord: Coordinates) {
    if (!coord.lat || !coord.lon) {
      throw new Error();
    }
    return `${WEATHER_API_URL}2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${process.env.API_KEY}`;
  },
  geo(city: string = '', country: string = '') {
    return `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${process.env.API_KEY}`;
  },

  geoCities(city: string = '') {
    return GEO_CITIES_URL + `&namePrefix=${city}&limit=7`;
  },

  //return endpoint path for specified units
  units(unit: Units = Units.metric) {
    return `&units=${unit}`;
  },
};
