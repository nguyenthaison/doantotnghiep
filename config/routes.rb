Rails.application.routes.draw do
  root "react_app#home"

  namespace :api do
    namespace :v1 do
      resources :songs
    end
  end

  get "*path", to: "react_app#home"
end
