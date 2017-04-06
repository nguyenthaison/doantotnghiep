class Song < ApplicationRecord
  SONG_ATTRIBUTES_PARAMS = %i[name]

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
  has_many :lyrics

  validates :name, presence: true, length: {maximum: 100, minimum: 1}

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

  def create_singer_lyric params, current_user
    Lyric.create(content: params[:lyric_content], user_id: current_user.id, song_id: self.id)
    JSON.parse(params[:singer_name]).each do |item|
      byebug
      if (!item["id"])
        singer = Singer.create(name: item["name"])
      else
        SingerSong.create(singer_id: item["id"], song_id: self.id)
      end
    end
    JSON.parse(params[:music_type_song_ids]).each do |item|
      MusicTypeSong.create(music_type_id: item, song_id: self.id)
    end
  end
end
