import { WeatherCard, compassSector } from './appTypes.types';
import { getElement } from './controller';
import { formatInTimeZone } from 'date-fns-tz';

export function renderHighlights(current: WeatherCard) {
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

  highlightCard.querySelector('#windspeed')!.textContent =
    `${current.highlights.wind_speed}km/h `;

  highlightCard.querySelector('#precipitation')!.textContent = `${
    (current.highlights.rain ?? 0) + (current.highlights.snow ?? 0)
  }mm/h `;

  highlightCard.querySelector('#pop')!.textContent =
    `${current.highlights.pop}%`;

  highlightCard.querySelector('#uv')!.textContent = `${current.highlights.uvi}`;
  highlights.appendChild(highlightCard);
  getElement('#current-highlights', HTMLElement).replaceChildren(highlights);
}

function toCompass(degree: number) {
  return compassSector[+(degree / 22.5).toFixed(0)];
}
