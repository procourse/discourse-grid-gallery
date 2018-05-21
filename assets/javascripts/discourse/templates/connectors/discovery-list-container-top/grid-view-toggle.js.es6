// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';

export default {
    actions: {
        gridToggle() {
          return ajax("/grid-gallery/toggle", {
            type: 'PUT',
            data: { category_id: this.get('category.id'), tag_id: null, user_id: this.currentUser.id }
          });
        }
    }
}