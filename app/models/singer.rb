class Singer < ApplicationRecord
  ATTRIBUTES_PARAMS = [:name, :age, :dob, :content, :total_favorite]
  ALLOWED_METHODS = [:total_favorite]

  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :singer_songs
  has_many :songs, through: :singer_songs
  has_many :artist_music_types, as: :artist, dependent: :destroy

  validates :name, presence: true, length: {maximum: 100, minimum: 1}

  def total_favorite
    favorite_articles.size
  end
end
