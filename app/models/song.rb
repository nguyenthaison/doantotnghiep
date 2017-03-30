class Song < ApplicationRecord
  belongs_to :album
  belongs_to :user

  has_many :author_songs
  has_many :authors, through: :author_songs
  has_many :music_type_songs
  has_many :music_types, through: :music_type_songs
  has_many :singer_songs
  has_many :singers, through: :singer_songs
  has_many :song_ranks
  has_many :ranks, through: :song_ranks
end
