export default{
  shouldRender(args, component){
    if (args && args.category && args.category.grid_view){
      if (args.category.grid_view){
        if (args.category.user_grid_view == "true"){
          $('body').addClass('display-grid-gallery');
        }
        else{
          $('body').removeClass('display-grid-gallery');
        }
      }
      if (!Discourse.User.current()){return false;};
      return true;
    }
    else{
      return false;
    }
  },
  setupComponent(args){
    let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
  }
}
