GridGallery::Engine.routes.draw do
  post "/toggle" => "grid#toggle_grid_preference"
  get "/grid_view" => "grid#get_grid_preference"
end
