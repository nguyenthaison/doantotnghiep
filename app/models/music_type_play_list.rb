class MusicTypePlayList < ApplicationRecord
  belongs_to :music_type
  belongs_to :play_list
end
