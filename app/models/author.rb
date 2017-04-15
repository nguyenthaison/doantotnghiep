class Author < ApplicationRecord
  has_many :author_songs
  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :songs, through: :author_songs
end
