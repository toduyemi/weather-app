import { ForecastCard, JSONMap } from './appTypes.types';
import * as openWeather from './openWeatherIcons.json';

export function renderDailyCards(forecast: ForecastCard): void {
  // const map = JSON.parse(openWeather);
  const map: JSONMap = openWeather;
  const daily = document.createElement('ul');
  daily.classList.add('daily-list');
  const template: HTMLTemplateElement =
    document.querySelector('#daily-template')!;

  for (const day in forecast) {
    const dailyCard = document.importNode(template.content, true);
    if (
      dailyCard.querySelector('.date') &&
      dailyCard.querySelector('.icon') &&
      dailyCard.querySelector('.description') &&
      dailyCard.querySelector('.high') &&
      dailyCard.querySelector('.low')
    ) {
      const prop = forecast[day].weather as keyof typeof map;
      const weatherIcon = new Image();
      weatherIcon.src = `./assets/weather-icons-master/production/line/openweathermap/${map[prop].image}.svg`;

      dailyCard.querySelector('.date')!.textContent = day;
      dailyCard.querySelector('.icon')!.appendChild(weatherIcon);
      dailyCard.querySelector('.description')!.textContent = map[prop].label;
      dailyCard.querySelector('.high')!.textContent =
        `${forecast[day].temp_high}`;
      dailyCard.querySelector('.low')!.textContent =
        `${forecast[day].temp_low}`;

      daily.appendChild(dailyCard);
    }
  }

  document.querySelector('#daily-forecast')?.appendChild(daily);
}
