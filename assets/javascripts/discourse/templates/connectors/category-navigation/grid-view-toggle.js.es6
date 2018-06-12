export default{
  shouldRender(args, component){
    if (args.category && args.category.grid_view){
      if (args.category.user_grid_view){
        $('body').addClass('display-grid-gallery');
      }
      return true;
    }
    else{
      $('body').removeClass('display-grid-gallery');
      return false;
    }
  },
  setupComponent(args){
    let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
  }
}
