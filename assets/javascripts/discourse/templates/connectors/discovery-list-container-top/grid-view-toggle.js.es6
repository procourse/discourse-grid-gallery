export default{
  setupComponent(args){
    let tags = Discourse.SiteSettings.grid_gallery_tags.split(',');
    console.log(this.get("model"));
  }
}
