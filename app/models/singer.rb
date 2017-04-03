class Singer < ApplicationRecord
  has_many :singer_songs
  has_many :songs, through: :singer_songs
end
