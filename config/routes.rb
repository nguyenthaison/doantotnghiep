Rails.application.routes.draw do
  root "react_app#home"

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :songs
      resources :subjects
      resources :ranks
      resources :albums
      resources :countries
      resources :sessions, only: :create
    end
  end

  get "*path", to: "react_app#home"
end
