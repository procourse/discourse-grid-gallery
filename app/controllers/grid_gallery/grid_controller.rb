module GridGallery
  class GridController < ::ApplicationController
    before_action :ensure_logged_in

    def toggle_grid_preference
      byebug
    end

  end
end