class MusicType < ApplicationRecord
  has_many :album_music_types
  has_many :albums, through: :album_music_types
  has_many :music_type_songs
  has_many :music_type_play_lists
  has_many :play_lists, through: :music_type_play_lists
  has_many :songs, through: :music_type_songs
end
