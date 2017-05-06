class Api::V1::FavoriteArticlesController < Api::BaseController
  # skip_load_and_authorize_resource

  def index
    response_success base_index_response "favorite_articles"
  end

  def create
    if @favorite_article.save
      response_success favorite_article: @favorite_article
    else
      response_fail @favorite_article.errors
    end
  end

  def destroy
    if @favorite_article.destroy
      response_success favorite_article: @favorite_article
    else
      response_fail favorite_article: @favorite_article
    end
  end

  private
  def favorite_article_params
    params.require(:favorite_article).permit(FavoriteArticle::ATTRIBUTE_PARAMS).merge(user_id)
  end
end
