// TODO Get/Set data on user via PluginStore on click
// TODO Function to pass logic to hbs for determining which button to show
import { ajax } from 'discourse/lib/ajax';
import { default as computed } from 'ember-addons/ember-computed-decorators';
import { on } from 'ember-addons/ember-computed-decorators';


export default Ember.Component.extend({
  isTagPage: false,

  @on('didInsertElement')
  set_status(){
    if (this.parentView.category && this.parentView.category.user_grid_view == true){
      this.set('categoryGridViewEnabled', true);
      $('body').addClass('display-grid-gallery');
    }
    else {
      this.set('categoryGridViewEnabled', false);
    }
    let excludeTags = this.currentUser.exclude_grid_view_tags;
    let tagId = null;
    if (this.container.owner.lookup('controller:tags.show').tag) {
      tagId = this.container.owner.lookup('controller:tags.show').tag.id;
    }
    if (tagId) {
      this.set("isTagPage", true);
      if (excludeTags && excludeTags.includes(tagId)) {
        this.set("tagGridViewEnabled",false);
      }
      else{
        this.set('tagGridViewEnabled', true);
        $('body').addClass('display-grid-gallery');
      }

      //Setting the width and heights of the grid items
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = `.display-grid-gallery .topic-thumbnail img { width: ${Discourse.SiteSettings.grid_gallery_desktop_picture_width} !important;} .mobile-view .display-grid-gallery .topic-thumbnail img { width: ${Discourse.SiteSettings.grid_gallery_mobile_picture_width} !important;}`;
      document.body.appendChild(css);

    }
  },

  willDestroyElement(){
    $('body').removeClass('display-grid-gallery');
  },


  actions: {
        gridToggle() {
          const self = this;
          if (this.get("isTagPage")) {
            ajax("/grid-gallery/toggle", {
              type: 'POST',
              data: { tag_id: this.container.owner.lookup('controller:tags.show').tag.id, user_id: this.currentUser.id }
            }).then((result) => {
              if(result['success'] == 'OK'){
                if (result['grid_view'] == "true"){
                  let tagExclusions = self.currentUser.exclude_grid_view_tags;
                  var index = tagExclusions.indexOf(this.container.owner.lookup('controller:tags.show').tag.id);
                  if (index > -1) {
                    tagExclusions.splice(index, 1);
                  }
                  self.parentView.currentUser.set('exclude_grid_view_tags', tagExclusions);
                  $('body').addClass('display-grid-gallery');
                  this.set("tagGridViewEnabled",true)

                }
                else{
                  let tagExclusions = self.currentUser.exclude_grid_view_tags;
                  tagExclusions.push(this.container.owner.lookup('controller:tags.show').tag.id);
                  self.parentView.currentUser.set('exclude_grid_view_tags', tagExclusions);
                  $('body').removeClass('display-grid-gallery');
                  this.set("tagGridViewEnabled",false)
                }
              }
            });
          }else {
            ajax("/grid-gallery/toggle", {
              type: 'POST',
              data: { category_id: this.args.category.id, user_id: this.currentUser.id }
            }).then((result) => {
              if(result['success'] == 'OK'){
                self.parentView.category.set('user_grid_view', result['grid_view'] == 'true');
                if (result['grid_view'] == 'true'){
                  this.set('categoryGridViewEnabled', true);
                  $('body').addClass('display-grid-gallery');
                }
                else{
                  this.set('categoryGridViewEnabled', false);
                  $('body').removeClass('display-grid-gallery');
                }
              }
            });
          }
        }
    }
});
