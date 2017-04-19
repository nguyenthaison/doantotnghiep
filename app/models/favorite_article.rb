class FavoriteArticle < ApplicationRecord
  ATTRIBUTE_PARAMS = [:user_id, :article_type, :article_id]

  belongs_to :user
  belongs_to :article, polymorphic: true

  validates :user_id, presence: true, uniqueness: true
end
