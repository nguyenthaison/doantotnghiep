source "https://rubygems.org"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end
gem "rails", "~> 5.0.1"
gem "mysql2"
gem "puma", "~> 3.0"
gem "bootstrap-sass"
gem "sass-rails", "~> 5.0"
gem "uglifier", ">= 1.3.0"
gem "coffee-rails", "~> 4.2"
gem "jquery-rails"
gem "jbuilder", "~> 2.5"
gem "cancancan"
gem "devise"
gem "config"
gem "paperclip", git: "git@github.com:scpike/paperclip.git"
gem "active_model_serializers"
gem "whenever"

group :development, :test do
  gem "byebug", platform: :mri
  gem "faker"
end

group :development do
  gem "web-console", ">= 3.3.0"
  gem "fabrication"
  gem "listen", "~> 3.0.5"
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  gem "rspec-rails"
end

gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
