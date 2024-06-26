//@ts-ignore
import { autocomplete } from '@algolia/autocomplete-js';

import { CitiesObj, Coordinates } from '../types/appTypes.types';
import { refreshPage } from './app';
import { fetchCities } from '../helpers/apiHelpers';
import type { AutocompleteSource } from '@algolia/autocomplete-js';
import { getElement } from '../utilities/typeUtility';

function debouncePromise<TParams extends Array<unknown>, TRes>(
  fn: (...a: TParams) => Promise<TRes>,
  time: number,
) {
  let timerId: ReturnType<typeof setTimeout> | undefined = undefined;

  return function debounced(...args: TParams) {
    if (timerId) {
      clearTimeout(timerId);
    }
    return new Promise<TRes>((resolve) => {
      timerId = setTimeout(() => resolve(fn(...args)), time);
    });
  };
}

const debounced = debouncePromise((items) => Promise.resolve(items), 1100);

export async function autoSearch() {
  //observe the unit Toggle
  let currentCoord: Coordinates;
  const unitToggle = getElement('#unit-toggle', HTMLInputElement);

  unitToggle.addEventListener('change', (e) => {
    if (currentCoord) {
      refreshPage(currentCoord, unitToggle.checked);
    }
  });

  autocomplete({
    container: '#search-form',
    placeholder: 'Location/City...',
    getSources() {
      return debounced([
        {
          sourceId: 'cities',
          getItems({ query }: { query: string }) {
            return fetchCities(query);
          },
          getItemInputValue({ item }: { item: CitiesObj }) {
            return `${item.label.name}, ${item.label.region} - ${item.label.country}`;
          },
          templates: {
            item({ item }: { item: CitiesObj }) {
              return `${item.label.name}, ${item.label.region} - ${item.label.countryCode}`;
            },
          },
          onSelect({ item }: { item: CitiesObj }) {
            //update state of current place of interest
            currentCoord = {
              lat: item.coord.lat,
              lon: item.coord.lon,
              country: item.label.country,
            };
            refreshPage(currentCoord, unitToggle.checked);
          },
        },
      ]) as Promise<
        (boolean | AutocompleteSource<Record<string, unknown>> | undefined)[]
      >;
    },
  });
}
