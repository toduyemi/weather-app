import { secondsToHours } from 'date-fns';
import { WeatherCard } from './appTypes.types';
import { getElement, secondsToHHMM } from './controller';
import { formatInTimeZone } from 'date-fns-tz';

export function renderQueryTitle(weatherObj: WeatherCard) {
  const dateTitle: HTMLHeadingElement = getElement(
    '#local-date',
    HTMLHeadingElement,
  );
  const locationTitle: HTMLHeadingElement = getElement(
    '#location',
    HTMLHeadingElement,
  );

  //fix date
  dateTitle.textContent = formatInTimeZone(
    weatherObj.dt * 1000,
    weatherObj.timezone,
    'do MMMM, O',
  );
  locationTitle.textContent = `${weatherObj.name}, ${weatherObj.country}`;
}
