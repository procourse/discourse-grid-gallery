import { withPluginApi } from 'discourse/lib/plugin-api';
import { on } from 'ember-addons/ember-computed-decorators';

function initialize(api) {
  api.modifyClass('controller:discovery', {
    @on("init")
    addBodyClass() {
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = `.display-grid-gallery .topic-thumbnail img { width: ${Discourse.SiteSettings.grid_gallery_desktop_picture_width} !important;}`;
      document.body.appendChild(css);
      if (this.get('category') && this.get('category').user_grid_view){
        $('body').addClass('display-grid-gallery');
      }
    }
  })
}

export default {
  name: 'extend-for-grid-gallery',
  initialize(container) {
    withPluginApi('0.8.13', api => initialize(api, container));
  }
};
