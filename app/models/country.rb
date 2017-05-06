class Country < ApplicationRecord
  include SmartAsJson

  has_many :country_music_types
  has_many :music_types, through: :country_music_types
  has_many :songs
  has_many :albums
end
