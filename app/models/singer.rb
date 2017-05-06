class Singer < ApplicationRecord
  ATTRIBUTES_PARAMS = [:name, :age, :dob, :content, :total_favorite]

  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :singer_songs
  has_many :songs, through: :singer_songs

  validates :name, presence: true, length: {maximum: 100, minimum: 1}
end
