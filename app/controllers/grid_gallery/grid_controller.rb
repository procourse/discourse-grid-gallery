require 'json'

module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference
      user_id = params[:user_id].to_s
      category_id = params[:category_id].to_i
      data = ::PluginStore.get('grid-gallery-plugin', user_id)

      if data.nil?
        category_ids = []
        category_ids << category_id
        data = {
          category_ids: category_ids
        }
        ::PluginStore.set('grid-gallery-plugin', user_id, data)
      end

      render json: success_json.merge(messages: data)
    end

  end
end
