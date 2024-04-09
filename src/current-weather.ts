import { iconPath } from '.';
import { Units, WeatherCard } from './appTypes.types';
import { getElement, printUnit } from './controller';
import { GeoDBCityResponse } from './geoDB.types';

export function renderWeather(
  current: WeatherCard,
  country: string,
  unitState: Units,
) {
  // renderTitle(current);

  const template: HTMLTemplateElement = getElement(
    '#current-template',
    HTMLTemplateElement,
  );

  const currentCard = document.importNode(template.content, true);
  currentCard.querySelector('#location')!.textContent = `${current.name}, \r\n`;
  currentCard.querySelector('#location')!.textContent += `${country}`;
  const weatherIcon = new Image();
  weatherIcon.src = iconPath + `${current.weather_icon}.svg`;

  currentCard.querySelector('#temp-output')!.innerHTML =
    `${current.temp}` + printUnit(unitState);
  currentCard.querySelector('#icon-ctr')!.prepend(weatherIcon);

  currentCard.querySelector('#feels-like')!.innerHTML =
    `${current.feels_like}` + printUnit(unitState);

  //   today.appendChild(dailyCard);

  document.querySelector('#current-ctr')?.replaceChildren(currentCard);
}

// export function renderTitle(current: WeatherCard) {
//   const titleCtr = document.querySelector('#output-title');

//   if (titleCtr) {
//     titleCtr.textContent = `${current.name} - ${current.dt.substring(4, 10)}`;
//   }
// }

// currentCard.querySelector('#description-output')!.textContent =
//     `${current.weather_condition}`;
