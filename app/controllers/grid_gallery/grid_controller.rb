require 'json'

module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference
      grid_view = params[:grid_view]
      u_id = params[:user_id]
      t_id = params[:tag_id]
      cat_id = params[:category_id]
      data = nil

        ::PluginStore.set('grid-gallery-plugin', "grid-gallery-u#{u_id}-c#{cat_id}", grid_view)
        unless cat_id.nil? || cat_id.empty?
        data = ::PluginStore.get('grid-gallery-plugin', "grid-gallery-u#{u_id}-c#{cat_id}")
      end
      unless t_id.nil?
        if grid_view.nil? || grid_view.empty?
          grid_view = []
        end
        ::PluginStore.set('grid-gallery-plugin', "grid-gallery-tags-u#{u_id}", grid_view)
        data = ::PluginStore.get('grid-gallery-plugin', "grid-gallery-tags-u#{u_id}")
        puts "hey"
        puts data
        puts "grid_view"
      end

      if data.nil?
        render json: {error: "failed"}
      else
        render json: success_json.merge(grid_view: data)
      end
    end

  end
end
