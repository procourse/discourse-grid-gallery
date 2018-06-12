export default{
  shouldRender(args, component){
    if(component.container.owner.lookup('router:main').currentRouteName.indexOf('tags') > -1){
      let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
      if (tags.includes(component.container.owner.lookup('controller:tags.show').tag.id)){
        $('body').addClass('display-grid-gallery');
        return tags.includes(component.container.owner.lookup('controller:tags.show').tag.id);
      }
      else {
        return false;
      }
    }
    else{
      return false;
    }
  },
  setupComponent(args){
    let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
  }
}