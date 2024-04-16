import { url } from '../helpers/apiHelpers';
import { fetchData } from '../utilities/apiUtilities';
import { createForecastArr, parse5DayForecast, parseCurrentWeather, } from '../helpers/dataHelpers';
import { parseUnitState } from '../helpers/helpers';
import { renderWeather, renderConditionsTitle } from './current-weather';
import { renderDailyCards } from './daily-forecast';
import { renderChart } from './dataCharts';
import { renderQueryTitle } from './date-time';
import { renderHighlights } from './highlights';
export async function refreshPage(coord, unitFlag) {
    const unitState = parseUnitState(unitFlag);
    const unitUrl = url.units(unitState);
    const responseFore = await fetchData({
        url: url.forecast(coord),
        units: unitUrl,
    });
    const responseWeath = await fetchData({
        url: url.weather(coord),
        units: unitUrl,
    });
    const forecastArr = createForecastArr(responseFore);
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
//# sourceMappingURL=app.js.map