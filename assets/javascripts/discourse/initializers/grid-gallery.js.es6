import { withPluginApi } from 'discourse/lib/plugin-api';
import { on } from 'ember-addons/ember-computed-decorators';

function initialize(api) {
}

export default {
  name: 'extend-for-grid-gallery',
  initialize(container) {
    withPluginApi('0.8.13', api => initialize(api, container));
  }
};
