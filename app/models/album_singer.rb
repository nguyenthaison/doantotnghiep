class AlbumSinger < ApplicationRecord
  belongs_to :album
  belongs_to :singer
end
