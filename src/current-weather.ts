import { WeatherCard, JSONMap } from './appTypes.types';
import * as openWeather from './openWeatherIcons.json';

export function renderWeather(current: WeatherCard): void {
  // const map = JSON.parse(openWeather);
  renderTitle(current);
  const map: JSONMap = openWeather;
  //   const today = document.createElement('ul');
  //   today.classList.add('daily-list');
  const template: HTMLTemplateElement =
    document.querySelector('#current-template')!;

  const currentCard = document.importNode(template.content, true);

  const weatherIcon = new Image();
  weatherIcon.src = `./assets/weather-icons-master/production/line/openweathermap/${current.weather_icon}.svg`;

  currentCard.querySelector('#temp-output')!.textContent = `${current.temp}`;
  currentCard.querySelector('#icon-ctr')!.appendChild(weatherIcon);
  currentCard.querySelector('#description-output')!.textContent =
    `${current.weather_condition}`;
  currentCard.querySelector('#feels-like #temp')!.textContent =
    `${current.feels_like}`;

  //   today.appendChild(dailyCard);

  document.querySelector('#current-ctr')?.appendChild(currentCard);
}

export function renderTitle(current: WeatherCard) {
  const titleCtr = document.querySelector('#output-title');

  if (titleCtr) {
    titleCtr.textContent = `${current.name} - ${current.date.substring(4, 10)}`;
  }
}
