class SingerSong < ApplicationRecord
  belongs_to :singer
  belongs_to :song

  accepts_nested_attributes_for :singer
end
