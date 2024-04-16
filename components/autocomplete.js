//@ts-ignore
import { autocomplete } from '@algolia/autocomplete-js';
import { refreshPage } from './app';
import { fetchCities } from '../helpers/apiHelpers';
import { getElement } from '../utilities/typeUtility';
function debouncePromise(fn, time) {
    let timerId = undefined;
    return function debounced(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        return new Promise((resolve) => {
            timerId = setTimeout(() => resolve(fn(...args)), time);
        });
    };
}
const debounced = debouncePromise((items) => Promise.resolve(items), 1100);
export async function autoSearch() {
    //observe the unit Toggle
    let currentCoord;
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
                    getItems({ query }) {
                        return fetchCities(query);
                    },
                    getItemInputValue({ item }) {
                        return `${item.label.name}, ${item.label.region} - ${item.label.country}`;
                    },
                    templates: {
                        item({ item }) {
                            return `${item.label.name}, ${item.label.region} - ${item.label.countryCode}`;
                        },
                    },
                    onSelect({ item }) {
                        //update state of current place of interest
                        currentCoord = {
                            lat: item.coord.lat,
                            lon: item.coord.lon,
                            country: item.label.country,
                        };
                        refreshPage(currentCoord, unitToggle.checked);
                    },
                },
            ]);
        },
    });
}
//# sourceMappingURL=autocomplete.js.map