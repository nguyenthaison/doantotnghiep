require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Doantotnghiep
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.autoload_paths << Rails.root.join("app/services")
    config.paperclip_defaults = {
      path: ":rails_root/public/system/:class/:id/:style/:custom_filename",
      url: "/system/:class/:id/:style/:custom_filename"
    }
  end
end
