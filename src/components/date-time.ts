import { format } from 'date-fns';
import { WeatherCard } from '../types/appTypes.types';
import { secondsToHHMM } from '../helpers/helpers';
import { getElement } from '../utilities/typeUtility';
import { formatInTimeZone } from 'date-fns-tz';

export function renderQueryTitle(weatherObj: WeatherCard) {
  const dateTitle: HTMLHeadingElement = getElement(
    '#local-date',
    HTMLHeadingElement,
  );
  const timeTitle: HTMLHeadingElement = getElement(
    '#local-time',
    HTMLHeadingElement,
  );

  //set date and time seperately for styling purposes
  dateTitle.textContent = formatInTimeZone(
    weatherObj.dt * 1000,
    weatherObj.timezone,
    'do MMMM',
  );

  timeTitle.textContent = formatInTimeZone(
    weatherObj.dt * 1000,
    weatherObj.timezone,
    'h:mm aaaa O',
  );
}
