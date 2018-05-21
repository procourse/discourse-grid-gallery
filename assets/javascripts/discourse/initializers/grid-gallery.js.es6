import { withPluginApi } from 'discourse/lib/plugin-api';

function initialize(api) {

}

export default {
  name: 'extend-for-grid-gallery',
  initialize(container) {
    withPluginApi('0.8.13', api => initialize(api, container));
  }
};