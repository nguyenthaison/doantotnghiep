class PlayListSong < ApplicationRecord
  ATTRIBUTE_PARAMS = [:play_list_id, :song_id]

  belongs_to :play_list
  belongs_to :song
end
