class FavoriteArticle < ApplicationRecord
  belongs_to :user
  belongs_to :article, polymorphic: true
end
