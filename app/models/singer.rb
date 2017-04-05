class Singer < ApplicationRecord
  has_many :singer_songs
  has_many :songs, through: :singer_songs

  validates :name, presence: true, length: {maximum: 100, minimum: 1}
end
