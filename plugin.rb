# name: discourse-grid-gallery
# about: A plugin to display post images in a grid.
# version: 0.0.1
# authors: ProCourse
# url: https://github.com/procourse/discourse-grid-gallery
require_relative("lib/grid_toggle")

enabled_site_setting :grid_gallery_enabled

GridViewPlugin = GridViewPlugin

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

    module GridViewPlugin
        class GridViewController < ActionController::Base
            include CurrentUser

            # Set Default load to Grid
            def load_grid_setting

            end

            def set_grid_setting

            end

            private
            def type
            end

            def id
            end

            def target
                @_target ||= GridViewPlugin::GridTarget.new(type, id)
            end

            def user_toggle
                @_toggle ||= GridViewPlugin::GridUserToggle.new(@_target, current_user)
            end
        end
    end
end
