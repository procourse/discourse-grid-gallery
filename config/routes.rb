GridGallery::Engine.routes.draw do
  post "/toggle" => "grid#toggle_grid_preference"
end
