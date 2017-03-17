Rails.application.routes.draw do
  root "react_app#home"
  # get "health.html", to: "static_pages#health"

  # devise_for :users

  namespace :api do
    namespace :v1 do
      # resources :clients
      # resources :positions
      # resources :attachments, only: [:create, :destroy]
      # resources :manual_files
      # resources :lines
      # resources :troubles
      # resources :tags
      # resources :organizations
      # resources :departments
      # resources :teams
      # resources :folders
      # resources :bookmark_folders
      # resources :bookmarks
      # resources :navigations do
      #   post "import_flow", on: :member
      # end
      # resources :steps, only: [:index] do
      #   collection do
      #     post "update_all_steps"
      #   end
      # end
      # resources :flows
      # resources :todos, except: [:edit, :show]
      # resources :claims
      # resources :helps, only: [:create, :index, :update]
      # resources :users do
      #   collection do
      #     patch "update_password"
      #   end
      # end
      # resources :sessions, only: :create
      # resources :notifications do
      #   post "update_readed_user", on: :member
      # end
      # resources :trouble_names, except: [:destroy, :create]
      # resources :feeds, only: :index
      # resources :settings, only: [:update, :create]
      # resources :notification_notes
      # resources :fields
      # resources :notification_addresses
      # resources :rss_sources
      # resources :comments do
      #   post "update_reaction", on: :member
      # end
      # resources :faquestions, :communities do
      #   post "update_helpful", on: :member
      #   post "update_favorite", on: :member
      #   get "get_data_for_cloning", on: :collection
      # end
      # resources :communities do
      #   post "update_helpful", on: :member
      #   post "update_favorite", on: :member
      # end
      # resources :companies
      # resources :user_activities
      # patch "tags" => "tags#batch_update"
      # if Rails.env === "production"
      #   get "download" => "manual_files#download"
      # else
      #   get "download/:id" => "manual_files#download"
      # end
      # get "authentication" => "authentication#index"
      # post "change_field" => "authentication#change_field"
      # get "get_contribution" => "authentication#get_contribution"
    end
  end

  get "*path", to: "react_app#home"
end
