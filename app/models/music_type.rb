class MusicType < ApplicationRecord
  has_many :music_type_songs
  has_many :songs, through: :music_type_songs
end
