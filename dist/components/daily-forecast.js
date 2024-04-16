import { iconPath } from '../helpers/apiHelpers';
import { printTempUnit, secondsToHHMM } from '../helpers/helpers';
import * as openWeather from '../openWeatherIcons.json';
import { formatInTimeZone } from 'date-fns-tz';
export function renderDailyCards(forecast, unitState) {
    // const map = JSON.parse(openWeather);
    const map = openWeather;
    const thisWeekHeading = document.createElement('h2');
    thisWeekHeading.textContent = 'This week';
    const daily = document.createElement('ul');
    daily.classList.add('daily-list');
    const template = document.querySelector('#daily-template');
    for (const day in forecast) {
        const dailyCard = document.importNode(template.content, true);
        const prop = forecast[day].weather;
        const weatherIcon = new Image();
        weatherIcon.src = iconPath + `${map[prop].image}.svg`;
        dailyCard.querySelector('.date').textContent = formatInTimeZone(forecast[day].timestamp * 1000, secondsToHHMM(forecast[day].timezone_offset), 'iiii, MMMM d');
        dailyCard.querySelector('.icon').appendChild(weatherIcon);
        dailyCard.querySelector('.description').textContent = map[prop].label;
        dailyCard.querySelector('.high').innerHTML = `${forecast[day].temp_high}${printTempUnit(unitState)}`;
        dailyCard.querySelector('.low').innerHTML = `${forecast[day].temp_low}${printTempUnit(unitState)}`;
        daily.appendChild(dailyCard);
    }
    document.querySelector('#daily-forecast')?.replaceChildren(daily);
    document.querySelector('#daily-forecast')?.prepend(thisWeekHeading);
}
//# sourceMappingURL=daily-forecast.js.map