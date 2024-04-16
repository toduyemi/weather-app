import { getElement } from '../utilities/typeUtility';
import { formatInTimeZone } from 'date-fns-tz';
export function renderQueryTitle(weatherObj) {
    const dateTitle = getElement('#local-date', HTMLHeadingElement);
    const timeTitle = getElement('#local-time', HTMLHeadingElement);
    //set date and time seperately for styling purposes
    dateTitle.textContent = formatInTimeZone(weatherObj.dt * 1000, weatherObj.timezone, 'do MMMM');
    timeTitle.textContent = formatInTimeZone(weatherObj.dt * 1000, weatherObj.timezone, 'h:mm aaaa O');
}
//# sourceMappingURL=date-time.js.map