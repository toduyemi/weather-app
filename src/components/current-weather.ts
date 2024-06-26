import { iconPath } from '../helpers/apiHelpers';
import { Units, WeatherCard } from '../types/appTypes.types';
import { printTempUnit } from '../helpers/helpers';
import { getElement } from '../utilities/typeUtility';
import { GeoDBCityResponse } from '../types/geoDB.types';

export function renderWeather(
  current: WeatherCard,
  country: string,
  unitState: Units,
) {
  const template: HTMLTemplateElement = getElement(
    '#weather-template',
    HTMLTemplateElement,
  );

  const currentCard = document.importNode(template.content, true);
  currentCard.querySelector('#location')!.textContent = `${current.name}, \r\n`;
  currentCard.querySelector('#location')!.textContent += `${country}`;
  const weatherIcon = new Image();
  weatherIcon.src = iconPath + `${current.weather_icon}.svg`;

  currentCard.querySelector('#temp-output')!.innerHTML =
    `${current.temp}` + printTempUnit(unitState);
  currentCard.querySelector('#icon-ctr')!.prepend(weatherIcon);

  currentCard.querySelector('#feels-like')!.innerHTML =
    `${current.feels_like}` + printTempUnit(unitState);

  //   today.appendChild(dailyCard);

  document.querySelector('#current-ctr')?.replaceChildren(currentCard);
}

export function renderConditionsTitle(current: WeatherCard) {
  const template: HTMLTemplateElement = getElement(
    '#current-template',
    HTMLTemplateElement,
  );

  const currentCard = document.importNode(template.content, true);
  currentCard.querySelector('#description-output')!.textContent =
    current.weather_condition;

  getElement('#current-conditions', HTMLElement).replaceChildren(currentCard);
}
