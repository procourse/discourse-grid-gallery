require 'json'

module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference
      user_id = params[:user_id].to_s
      category_id = params[:category_id].to_i
      grid_view = params[:grid_view]
      data = ::PluginStore.get('grid-gallery-plugin', user_id)
      catagory_grid = {
        catagory_id: category_id,
        grid_view: grid_view
      }

      if data.nil?
        category_ids = []
        category_ids << category_grid
        data = {
          category_ids: category_ids
        }
        ::PluginStore.set('grid-gallery-plugin', user_id, data)
      else
        category_ids = data[:category_ids]
        puts "hi"
        puts category_ids
        obj = category_ids.select { |record| record.category_id == category_id }
        obj[:grid_view] = grid_view
        data = obj
      end

      render json: success_json.merge(messages: data)
    end

  end
end
