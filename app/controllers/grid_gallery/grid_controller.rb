require 'json'

module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference

      if params[:category_id]
        current_category_status = ::PluginStore.get('grid-gallery-plugin', "grid-gallery-u#{params[:user_id]}-c#{params[:category_id]}") || "true"
        if current_category_status == "true"
          new_status = "false"
        else
          new_status = "true"
        end
        ::PluginStore.set('grid-gallery-plugin', "grid-gallery-u#{params[:user_id]}-c#{params[:category_id]}", new_status)
      end

      if params[:tag_id]
        tag_exclusions = ::PluginStore.get('grid-gallery-plugin', "grid-gallery-tags-u#{params[:user_id]}") || []
        if tag_exclusions.include?(params[:tag_id])
          tag_exclusions.delete(params[:tag_id])
          new_status = "true"
        else
          tag_exclusions.push(params[:tag_id])
          new_status = "false"
        end
        ::PluginStore.set('grid-gallery-plugin', "grid-gallery-tags-u#{params[:user_id]}", tag_exclusions)
      end

      if new_status.nil?
        render json: {error: "failed"}
      else
        render json: success_json.merge(grid_view: new_status)
      end
    end

  end
end
