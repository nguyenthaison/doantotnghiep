class PlayList < ApplicationRecord
  has_many :music_type_play_lists
  has_many :music_types, through: :music_type_play_lists
end
