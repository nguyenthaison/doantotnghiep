class MusicType < ApplicationRecord
  has_many :album_music_types, dependent: :destroy
  has_many :albums, through: :album_music_types
  has_many :artist_music_types, dependent: :destroy
  has_many :music_type_songs, dependent: :destroy
  has_many :music_type_play_lists, dependent: :destroy
  has_many :play_lists, through: :music_type_play_lists
  has_many :songs, through: :music_type_songs
end
