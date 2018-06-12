// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';
import { on } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  tagGridViewEnabled: false,
  isTagPage: false,

  @on('didInsertElement')
  set_status(){
    let gridView = this.currentUser.grid_view;
    let tagId = null;
    if (this.container.owner.lookup('controller:tags.show').tag) {
      tagId = this.container.owner.lookup('controller:tags.show').tag.id;
    }
    if (tagId) {
      this.set("isTagPage", true);
      if (gridView && gridView.includes(tagId)) {
        this.set("tagGridViewEnabled",true);
      }
    }
  },

  willDestroyElement(){
    $('body').removeClass('display-grid-gallery');
  },


  actions: {
        gridToggle() {
          let gridView = false;
          if (this.parentView.category && this.parentView.category.get('user_grid_view')) {
            gridView = true;
          }else if (this.get("isTagPage") && this.currentUser.grid_view && this.currentUser.grid_view.includes(this.container.owner.lookup('controller:tags.show').tag.id)) {
            gridView = true;
          }

          const self = this;
          if (this.get("isTagPage")) {
            let view_array = this.currentUser.grid_view;
            if (view_array == null) {
              view_array = [];
            }

            if (!gridView) {
              view_array.push(this.container.owner.lookup('controller:tags.show').tag.id);
            }else{
              var index = view_array.indexOf(this.container.owner.lookup('controller:tags.show').tag.id);
              if (index > -1) {
                view_array.splice(index, 1);
              }
            }

            ajax("/grid-gallery/toggle", {
              type: 'POST',
              data: { category_id: null, tag_id: this.container.owner.lookup('controller:tags.show').tag.id, user_id: this.currentUser.id, grid_view: view_array }
            }).then((result) => {
              if(result['success'] == 'OK'){
                if (result['grid_view'].includes(this.container.owner.lookup('controller:tags.show').tag.id)){
                  console.log("hey");
                  console.log(result);
                  self.parentView.currentUser.set('grid_view', view_array);
                  $('body').addClass('display-grid-gallery');
                  this.set("tagGridViewEnabled",true)
                  console.log(this.get("tagGridViewEnabled"));

                }
                else{
                  self.parentView.currentUser.set('grid_view', view_array);
                  $('body').removeClass('display-grid-gallery');
                  this.set("tagGridViewEnabled",false)
                  console.log(this.get("tagGridViewEnabled"));
                }
              }
            });
          }else {
            ajax("/grid-gallery/toggle", {
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
    }
});
