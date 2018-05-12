# name: discourse-blendernation-grid-gallery
# about: A plugin to display post images in a grid.
# version: 0.0.1
# authors: ProCourse

enabled_site_setting :tags_displaying_gallery
enabled_site_setting :desktop_picture_width
enabled_site_setting :mobile_picture_width

after_initialize do
    class ::Guardian
        def self.reset_grid_view_cache
          @@allowed_accepted_cache["allowed"] =
            begin
              Set.new(
                CategoryCustomField
                  .where(name: "enable_grid_for_category", value: "false")
                  .pluck(:category_id)
              )
            end
        end
    end
end
