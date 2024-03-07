// OpenWeather API Forecast Endpoint

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}
// OpenWeather API Weather Endpoint

export interface WeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  rain: RainWeather;
  clouds: Clouds;
  dt: number;
  sys: SysWeather;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface RainWeather {
  '1h': number;
}

export interface SysWeather {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

// OpenWeather API GeoCode City Endpoint

export interface GeoCityResponse {
  name: string;
  local_names?: { [key: string]: string };
  lat: number;
  lon: number;
  country: string;
  state: string;
}
// OpenWeather API GeoCode Postal/Zip Endpoint

export interface GeoPostalResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}
