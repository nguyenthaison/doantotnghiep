class PlayList < ApplicationRecord
  ALLOWED_METHODS = [:count_song]
  ATTRIBUTE_PARAMS = [:name, :describe]

  # has_attached_file :attachment

  has_many :play_list_songs, dependent: :destroy
  has_many :music_type_play_lists, dependent: :destroy
  has_many :music_types, through: :music_type_play_lists
  has_many :songs, through: :play_list_songs

  validates :name, presence: true, uniqueness: true
  # validates_attachment_content_type :attachment,
  #   content_type: [
  #     "image/jpeg",
  #     "image/png",
  #     "image/gif",
  #   ]

  def count_song
    self.songs.size
  end
end
