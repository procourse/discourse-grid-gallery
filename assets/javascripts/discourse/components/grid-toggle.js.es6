// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  topicGridView : true,

  didInsertElement() {
    ajax("/grid-gallery/grid_view", {
      type: 'POST',
      data: { category_id: this.args.category.id, tag_id: null, user_id: this.currentUser.id }
    }).then((result) => {
      this.set("topicGridView",result['grid_view']=='true');
    });
  },

  actions: {
        gridToggle() {
          // $(this).hide();
          console.log($(this)[0].parentView.parentView);
          let GridView = this.get("topicGridView");
          GridView = !GridView;
          let aj_d=ajax("/grid-gallery/toggle", {
            type: 'POST',
            data: { category_id: this.args.category.id, tag_id: null, user_id: this.currentUser.id, grid_view: GridView }
          }).then((result) => {
            if(result['success'] == 'OK'){
              this.set("topicGridView",GridView);
            }
          });
        }
    }
});
