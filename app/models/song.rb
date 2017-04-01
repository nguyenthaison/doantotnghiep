class Song < ApplicationRecord
  ATTRIBUTES_PARAMS = %i[attachment_file_name]

  has_attached_file :attachment

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

  validates_attachment_content_type :attachment,
    content_type: [
      # "application/octet-stream",
      # "application/vnd.ms-excel",
      # "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      # "application/vnd.ms-powerpoint",
      # "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      # "application/pdf",
      # "application/msword",
      # "image/jpeg",
      # "image/png",
      # "image/gif",
      # "video/mp4"
    ]
end
