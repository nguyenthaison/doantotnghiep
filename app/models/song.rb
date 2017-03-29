class Song < ApplicationRecord
  belongs_to :album
  belongs_to :user

  has_many :music_type_songs
  has_many :author_songs
  has_many :author, through: :author_songs
  has_many :singer_songs
  has_many :singer, through: :singer_songs
  has_many :music_types, through: :music_type_songs
end
