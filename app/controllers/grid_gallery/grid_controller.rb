require 'json'

module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference
      grid_view = params[:grid_view]
      u_id = params[:user_id]
      cat_id = params[:category_id]
      puts grid_view
      puts "grid_view"
      ::PluginStore.set('grid-gallery-plugin', "grid-gallery-u#{u_id}-c#{cat_id}", grid_view)
      data = ::PluginStore.get('grid-gallery-plugin', "grid-gallery-u#{u_id}-c#{cat_id}")

      if data.nil?
        render json: {error: "failed"}
      else
        render json: success_json.merge(grid_view: data)
      end
    end

  end
end
