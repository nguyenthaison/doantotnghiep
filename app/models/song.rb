class Song < ApplicationRecord
  SONG_ATTRIBUTES_PARAMS = %i[name]
  ALLOWED_METHODS = ["get_rank_previous"]
  JOIN_TABLES = [:singers, :author_songs, :music_types, :lyrics, :albums]

  has_attached_file :attachment

  belongs_to :user
  belongs_to :country

  has_many :album_songs, dependent: :destroy
  has_many :albums, through: :album_songs
  has_many :author_songs, dependent: :destroy
  has_many :authors, through: :author_songs
  has_many :play_list_songs, dependent: :destroy
  has_many :play_lists, through: :play_list_songs
  has_many :music_type_songs, dependent: :destroy
  has_many :music_types, through: :music_type_songs
  has_many :singer_songs, dependent: :destroy
  has_many :singers, through: :singer_songs
  has_many :lyrics, dependent: :destroy
  has_many :ranks, as: :target, dependent: :destroy
  has_many :favorite_musics, dependent: :destroy

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

  scope :filter_by_country, -> country do
  end

  scope :filter_by_music_type, -> id do
    song = Song.find id
    name_music_types = song.music_types.pluck(:name)
    joins(:music_types).where("music_types.name IN (?)", name_music_types).uniq
  end

  def create_singer_lyric params, current_user
    Lyric.create(content: params[:lyric_content], user_id: current_user.id, song_id: self.id)
    JSON.parse(params[:singer_name]).each do |item|
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

  def get_rank_previous
    # Song.includes(:ranks).where("ranks.start_date = ?, ranks.target_type = ?, ranks.target_id = ?",
    #   DateTime.now.beginning_of_week - 7.day, "song", self.id)
    # rank = Rank.find_by(start_date: DateTime.now.beginning_of_week - 7.day, target_type: "song", target_id: self.id)
    self.ranks.where(start_date: DateTime.now.beginning_of_week - 7.day, target_type: "song").first.number
  end

  def json_data options = {}
    options = options.deep_merge({
      include: {
        singers: {include: {favorite_articles: {}}},
        author_songs: {only: ["id", "name"]},
        music_types: {},
        lyrics: {include: {user: {only: ["id", "name"]}}},
        albums: {only: ["id", "name"]},
      },
    })
    as_json options
  end
end
