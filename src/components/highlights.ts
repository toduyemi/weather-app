'import { Units, WeatherCard, compassSector } from '../types/appTypes.types';
import { convertToBeaufort, mpsToKmh } from '../helpers/beaufort';
import { printSpeedUnit } from '../helpers/helpers';
import { getElement } from '../utilities/typeUtility';
import { formatInTimeZone } from 'date-fns-tz';

export function renderHighlights(current: WeatherCard, unitState: Units) {
  const template: HTMLTemplateElement = getElement(
    '#daily-statistics',
    HTMLTemplateElement,
  );

  const highlights = document.createElement('ul');
  const highlightCard = document.importNode(template.content, true);

  highlightCard.querySelector('#sunrise')!.textContent = formatInTimeZone(
    current.highlights.sunrise,
    current.timezone,
    'hh:mm aaaa',
  );
  highlightCard.querySelector('#sunset')!.textContent = formatInTimeZone(
    current.highlights.sunset,
    current.timezone,
    'hh:mm aaaa',
  );
  highlightCard.querySelector('#humidity')!.textContent =
    `${current.highlights.humidity}%`;

  highlightCard.querySelector('#pressure')!.textContent =
    `${current.highlights.pressure}hPa`;

  (highlightCard.querySelector('#beaufort') as HTMLImageElement).src =
    `./static/assets/weather-icons-master/production/line/all/wind-beaufort-${convertToBeaufort(
      current.highlights.wind_speed,
      unitState,
    )}.svg`;

  // ternary condition to check unit state, if metric convert mps to kmh and then print unit
  highlightCard.querySelector('#windspeed')!.textContent = `${
    unitState === Units.metric
      ? mpsToKmh(current.highlights.wind_speed).toFixed(2)
      : current.highlights.wind_speed
  }${printSpeedUnit(unitState)} `;

  highlightCard.querySelector('#precipitation')!.textContent = `${
    (current.highlights.rain ?? 0) + (current.highlights.snow ?? 0)
  }mm/h `;

  highlightCard.querySelector('#pop')!.textContent =
    `${current.highlights.pop}%`;

  highlightCard.querySelector('#uv')!.textContent = `${current.highlights.uvi}`;
  highlights.appendChild(highlightCard);
  getElement('#highlights', HTMLElement).replaceChildren(highlights);
}
