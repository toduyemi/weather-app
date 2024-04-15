import { getElement } from '../utilities/typeUtility';
import { Units } from '../types/appTypes.types';

export function printTempUnit(unitState: Units) {
  if (unitState == Units.metric) return '&deg;C';
  else return '&deg;F';
}

export function printSpeedUnit(unitState: Units) {
  if (unitState == Units.metric) return 'km/h';
  else return 'mph';
}

export function parseUnitState(flag: boolean) {
  if (!flag) return Units.metric;
  else return Units.imperial;
}

export function secondsToHHMM(seconds: number) {
  if (
    (seconds >= 3600 || seconds <= -3600) &&
    (seconds >= -90000 || seconds <= 90000)
  ) {
    if (seconds > 0) {
      return '+' + new Date(seconds * 1000).toISOString().substring(11, 16);
    }
    else {
      return '-' + new Date(seconds * 1000).toISOString().substring(11, 16);
    }
  }
  else {
    throw Error(
      'Number has to be more than 3600 and less than 90000 to maintain HH:MM format',
    );
  }
}
export function updateDateTime() {
  const now = new Date();
  const currentDate = now.toLocaleString('en-CA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const currentTime = now.toLocaleTimeString('en-US', {
    weekday: 'long',
    hour: 'numeric',
    minute: '2-digit',
  });

  getElement('#user-date', HTMLHeadingElement).textContent =
    currentDate + ' - ' + currentTime;
}
