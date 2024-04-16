import { url } from '../helpers/apiHelpers';
import { fetchData } from '../utilities/apiUtilities';
import {
  createForecastArr,
  parse5DayForecast,
  parseCurrentWeather,
} from '../helpers/dataHelpers';
import { parseUnitState } from '../helpers/helpers';
import { Coordinates, ForecastObj } from '../types/appTypes.types';
import { ForecastResponse, OneCallResponse } from '../types/openWeather.types';
import { renderWeather, renderConditionsTitle } from './current-weather';
import { renderDailyCards } from './daily-forecast';
import { renderChart } from './dataCharts';
import { renderQueryTitle } from './date-time';
import { renderHighlights } from './highlights';

export async function refreshPage(coord: Coordinates, unitFlag: boolean) {
  const unitState = parseUnitState(unitFlag);
  const unitUrl = url.units(unitState);
  const responseFore = await fetchData<ForecastResponse>({
    url: url.forecast(coord),
    units: unitUrl,
  });

  const responseWeath = await fetchData<OneCallResponse>({
    url: url.weather(coord),
    units: unitUrl,
  });
  const forecastArr: ForecastObj[] = createForecastArr(responseFore);

  renderChart(forecastArr, unitState);
  const daily = parse5DayForecast(forecastArr);

  const today = parseCurrentWeather(responseWeath, responseFore);
  if (coord.country) {
    renderWeather(today, coord.country, unitState);
  }
  renderConditionsTitle(today);
  renderHighlights(today, unitState);
  renderQueryTitle(today);
  renderDailyCards(daily, unitState);
}
