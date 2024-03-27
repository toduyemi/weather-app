import { iconPath } from '.';
import { Units, WeatherCard } from './appTypes.types';
import { getElement, printUnit } from './controller';

export function renderWeather(current: WeatherCard, unitState: Units) {
  renderTitle(current);

  const template: HTMLTemplateElement = getElement(
    '#current-template',
    HTMLTemplateElement,
  );

  const currentCard = document.importNode(template.content, true);

  const weatherIcon = new Image();
  weatherIcon.src = iconPath + `${current.weather_icon}.svg`;

  currentCard.querySelector('#temp-output')!.innerHTML =
    `${current.temp}` + printUnit(unitState);
  currentCard.querySelector('#icon-ctr')!.appendChild(weatherIcon);
  currentCard.querySelector('#description-output')!.textContent =
    `${current.weather_condition}`;
  currentCard.querySelector('#feels-like #temp')!.innerHTML =
    `${current.feels_like}` + printUnit(unitState);

  //   today.appendChild(dailyCard);

  document.querySelector('#current-ctr')?.replaceChildren(currentCard);
}

export function renderTitle(current: WeatherCard) {
  const titleCtr = document.querySelector('#output-title');

  if (titleCtr) {
    titleCtr.textContent = `${current.name} - ${current.date.substring(4, 10)}`;
  }
}
