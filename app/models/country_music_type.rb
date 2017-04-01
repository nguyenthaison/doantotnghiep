class CountryMusicType < ApplicationRecord
  belongs_to :country
  belongs_to :music_type
end
