GridGallery::Engine.routes.draw do
  post "/toggle" => "grid#toggle_grid_preference"
  get "/grid-view" => "grid#get_grid_preference"
end
