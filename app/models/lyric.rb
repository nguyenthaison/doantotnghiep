class Lyric < ApplicationRecord
  include SmartAsJson

  belongs_to :user
  belongs_to :song
end
