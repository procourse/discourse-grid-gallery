// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';
import { on } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  willDestroyElement(){
    $('body').removeClass('display-grid-gallery'); 
  },

  actions: {
        gridToggle() {
          let gridView = false;
          if (this.parentView.category.get('user_grid_view')) {
            gridView = true;
          }
          const self = this;
          let aj_d=ajax("/grid-gallery/toggle", {
            type: 'POST',
            data: { category_id: this.args.category.id, tag_id: null, user_id: this.currentUser.id, grid_view: !gridView }
          }).then((result) => {
            if(result['success'] == 'OK'){
              self.parentView.category.set('user_grid_view', result['grid_view'] == 'true');
              if (result['grid_view'] == 'true'){
                $('body').addClass('display-grid-gallery');
              }
              else{
                $('body').removeClass('display-grid-gallery'); 
              }
            }
          });
        }
    }
});
