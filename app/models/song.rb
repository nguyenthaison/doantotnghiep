class Song < ApplicationRecord
  belongs_to :album
  belongs_to :music_type
  belongs_to :singer_author
  belongs_to :user
end
