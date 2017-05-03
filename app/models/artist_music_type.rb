class ArtistMusicType < ApplicationRecord
  belongs_to :artist, polymorphic: true
  belongs_to :music_type
end
