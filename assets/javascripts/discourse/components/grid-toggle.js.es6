// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  topicGridView : true,

  actions: {
        gridToggle() {
          if (this.get("topicGridView")) {
            this.set("topicGridView",false);
          }else{
            this.set("topicGridView",true);
          }

          ajax("/grid-gallery/toggle", {
            type: 'POST',
            data: { category_id: this.args.category.id, tag_id: null, user_id: this.currentUser.id, grid_view: this.get("topicGridView") }
          }).then((result) => {
            console.log(result);
          });
        }
    }
});
