// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  topicGridView : true,

  actions: {
        gridToggle() {
          let data_a = ajax("/grid-gallery/toggle", {
            type: 'POST',
            data: { category_id: this.get('category.id'), tag_id: null, user_id: this.currentUser.id }
          });

          console.log(data_a);

          if (this.get("topicGridView")) {
            this.set("topicGridView",false);
          }else{
            this.set("topicGridView",true);
          }
        }
    }
});
