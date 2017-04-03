class MusicTypeSong < ApplicationRecord
  belongs_to :music_type
  belongs_to :song
end
