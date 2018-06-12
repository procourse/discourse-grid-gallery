export default{
  shouldRender(args, component){
    if(component.container.owner.lookup('router:main').currentRouteName.indexOf('tags') > -1){
      let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
      let tag_id = component.container.owner.lookup('controller:tags.show').tag.id;

      if (tags.includes(tag_id)){
        $('body').addClass('display-grid-gallery');
        return true;
      }
      else {
        return false;
      }
    }
    else{
      return false;
    }
  }
}
