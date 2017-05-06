class Author < ApplicationRecord
  include SmartAsJson

  ALLOWED_METHODS = [:total_favorites]

  has_many :author_songs, dependent: :destroy
  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :songs, through: :author_songs
  has_many :artist_music_types, as: :artist, dependent: :destroy

  def total_favorites
    favorite_articles.size
  end
end
