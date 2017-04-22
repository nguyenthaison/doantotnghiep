class PlayList < ApplicationRecord
  ALLOWED_METHODS = [:count_song]
  ATTRIBUTE_PARAMS = [:name, :describe, attachment_ids: []]

  has_many :play_list_songs, dependent: :destroy
  has_many :music_type_play_lists, dependent: :destroy
  has_many :music_types, through: :music_type_play_lists
  has_many :songs, through: :play_list_songs
  has_many :attachments, as: :attachmentable, dependent: :destroy

  validates :name, presence: true, uniqueness: true

  def count_song
    self.songs.size
  end
end
