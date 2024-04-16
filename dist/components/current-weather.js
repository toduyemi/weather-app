import { iconPath } from '../helpers/apiHelpers';
import { printTempUnit } from '../helpers/helpers';
import { getElement } from '../utilities/typeUtility';
export function renderWeather(current, country, unitState) {
    const template = getElement('#weather-template', HTMLTemplateElement);
    const currentCard = document.importNode(template.content, true);
    currentCard.querySelector('#location').textContent = `${current.name}, \r\n`;
    currentCard.querySelector('#location').textContent += `${country}`;
    const weatherIcon = new Image();
    weatherIcon.src = iconPath + `${current.weather_icon}.svg`;
    currentCard.querySelector('#temp-output').innerHTML =
        `${current.temp}` + printTempUnit(unitState);
    currentCard.querySelector('#icon-ctr').prepend(weatherIcon);
    currentCard.querySelector('#feels-like').innerHTML =
        `${current.feels_like}` + printTempUnit(unitState);
    //   today.appendChild(dailyCard);
    document.querySelector('#current-ctr')?.replaceChildren(currentCard);
}
export function renderConditionsTitle(current) {
    const template = getElement('#current-template', HTMLTemplateElement);
    const currentCard = document.importNode(template.content, true);
    currentCard.querySelector('#description-output').textContent =
        current.weather_condition;
    getElement('#current-conditions', HTMLElement).replaceChildren(currentCard);
}
//# sourceMappingURL=current-weather.js.map