class Album < ApplicationRecord
  has_many :avatars
  has_many :songs
  has_many :videos
end
