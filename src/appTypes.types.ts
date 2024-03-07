export interface ForecastCard {
  [date: string]: {
    temp_high: number;
    temp_low: number;
    weather: string;
  };
}

export interface ForecastObj {
  date: string;
  temp: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export type Coordinates = {
  lat: string;
  lon: string;
};
