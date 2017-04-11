class AlbumMusicType < ApplicationRecord
  belongs_to :album
  belongs_to :music_type
end
