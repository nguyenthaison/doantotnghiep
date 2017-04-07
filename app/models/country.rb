class Country < ApplicationRecord
  has_many :country_music_types
  has_many :music_types, through: :country_music_types
  has_many :songs
end
