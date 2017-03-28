Rails.application.routes.draw do
  root "react_app#home"

  namespace :api do
    namespace :v1 do
      resources :songs
      resources :subjects
      resources :ranks
      resources :albums
      resources :songs
    end
  end

  get "*path", to: "react_app#home"
end
