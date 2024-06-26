import { iconPath } from '../helpers/apiHelpers';
import { ForecastCard, JSONMap, Units } from '../types/appTypes.types';
import { printTempUnit, secondsToHHMM } from '../helpers/helpers';
import * as openWeather from '../openWeatherIcons.json';
import { formatInTimeZone } from 'date-fns-tz';

export function renderDailyCards(forecast: ForecastCard, unitState: Units) {
  // const map = JSON.parse(openWeather);
  const map: JSONMap = openWeather;
  const thisWeekHeading = document.createElement('h2');
  thisWeekHeading.textContent = 'This week';
  const daily = document.createElement('ul');
  daily.classList.add('daily-list');
  const template: HTMLTemplateElement =
    document.querySelector('#daily-template')!;

  for (const day in forecast) {
    const dailyCard = document.importNode(template.content, true);

    const prop: keyof typeof map = forecast[day].weather;
    const weatherIcon = new Image();
    weatherIcon.src = iconPath + `${map[prop].image}.svg`;

    dailyCard.querySelector('.date')!.textContent = formatInTimeZone(
      forecast[day].timestamp * 1000,
      secondsToHHMM(forecast[day].timezone_offset),
      'iiii, MMMM d',
    );
    dailyCard.querySelector('.icon')!.appendChild(weatherIcon);
    dailyCard.querySelector('.description')!.textContent = map[prop].label;
    dailyCard.querySelector('.high')!.innerHTML = `${
      forecast[day].temp_high
    }${printTempUnit(unitState)}`;
    dailyCard.querySelector('.low')!.innerHTML = `${
      forecast[day].temp_low
    }${printTempUnit(unitState)}`;

    daily.appendChild(dailyCard);
  }

  document.querySelector('#daily-forecast')?.replaceChildren(daily);
  document.querySelector('#daily-forecast')?.prepend(thisWeekHeading);
}
