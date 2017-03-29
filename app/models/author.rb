class Author < ApplicationRecord
  has_many :author_songs
  has_many :songs, through: :author_songs
end
