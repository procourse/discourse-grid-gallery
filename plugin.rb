# name: discourse-grid-gallery
# about: A plugin to display post images in a grid.
# version: 0.0.1
# authors: ProCourse
# url: https://github.com/procourse/discourse-grid-gallery

enabled_site_setting :grid_gallery_enabled

after_initialize do
    class ::Category
        def self.reset_grid_view_cache
          @grid_view_default_cache["grid_default"] =
            begin
              Set.new(
                CategoryCustomField
                  .where(name: "enable_grid_view", value: "false")
                  .pluck(:category_id)
              )
            end
        end

        @grid_view_default_cache = DistributedCache.new("grid_default")

        def self.grid_default?(category_id)
          return false unless SiteSetting.grid_gallery_enabled

          unless set = @grid_view_default_cache["grid_default"]
            set = reset_grid_view_cache
          end
          set.include?(category_id)
        end

        after_save :reset_grid_view_cache

        protected
        def reset_grid_view_cache
          ::Category.reset_grid_view_cache
        end
    end
end
