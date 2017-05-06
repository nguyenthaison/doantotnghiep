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
      resources :singers
      resources :favorite_articles, only: [:create, :destroy, :index]

      get "download/:id" => "songs#download"
      get "authentication" => "authentication#index"
    end
  end
  get "*path", to: "react_app#home"
end
