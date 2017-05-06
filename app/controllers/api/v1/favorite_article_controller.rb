class Api::V1::favorite_articlesController < Api::BaseController
  skip_load_and_authorize_resource

  def index
    response_success base_index_response "favorite_articles"
  end

  def create

  end
end
