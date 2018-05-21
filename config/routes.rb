GridGallery::Engine.routes.draw do
  put "/toggle" => "grid#toggle_grid_preference"
end