import { iconPath } from '.';
import { ForecastCard, JSONMap, Units } from './appTypes.types';
import { printUnit } from './controller';
import * as openWeather from './openWeatherIcons.json';

export function renderDailyCards(
  forecast: ForecastCard,
  unitState: Units,
): void {
  // const map = JSON.parse(openWeather);
  const map: JSONMap = openWeather;
  const daily = document.createElement('ul');
  daily.classList.add('daily-list');
  const template: HTMLTemplateElement =
    document.querySelector('#daily-template')!;

  for (const day in forecast) {
    const dailyCard = document.importNode(template.content, true);

    const prop = forecast[day].weather as keyof typeof map;
    const weatherIcon = new Image();
    weatherIcon.src = iconPath + `${map[prop].image}.svg`;

    dailyCard.querySelector('.date')!.textContent = day;
    dailyCard.querySelector('.icon')!.appendChild(weatherIcon);
    dailyCard.querySelector('.description')!.textContent = map[prop].label;
    dailyCard.querySelector('.high')!.innerHTML = `${
      forecast[day].temp_high
    }${printUnit(unitState)}`;
    dailyCard.querySelector('.low')!.innerHTML = `${
      forecast[day].temp_low
    }${printUnit(unitState)}`;

    daily.appendChild(dailyCard);
  }

  document.querySelector('#daily-forecast')?.replaceChildren(daily);
}
