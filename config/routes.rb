Rails.application.routes.draw do
  root "react_app#home"

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :albums
      resources :attachments, only: [:create, :destroy]
      resources :authors
      resources :countries
      resources :favorite_articles, only: [:create, :destroy, :index]
      resources :play_list_songs, only: [:create, :destroy]
      resources :play_lists
      resources :sessions, only: :create
      resources :singers
      resources :songs
      resources :subjects
      resources :ranks

      get "download/:id" => "songs#download"
      get "authentication" => "authentication#index"
    end
  end
  get "*path", to: "react_app#home"
end
