import { autoSearch } from './components/autocomplete';
import '@algolia/autocomplete-theme-classic';
import { updateDateTime } from './helpers/helpers';
import './style.css';
setInterval(updateDateTime, 1000);
autoSearch();
if (module && module.hot) {
    module.hot.accept();
}
//# sourceMappingURL=index.js.map