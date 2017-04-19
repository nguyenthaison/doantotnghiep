class PlayList < ApplicationRecord
  ALLOWED_METHODS = [:count_song]

  has_many :play_list_songs, dependent: :destroy
  has_many :music_type_play_lists, dependent: :destroy
  has_many :music_types, through: :music_type_play_lists
  has_many :songs, through: :play_list_songs

  def count_song
    self.songs.size
  end
end
