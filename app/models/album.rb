class Album < ApplicationRecord
  ALLOWED_METHODS = ["get_rank_previous"]
  JOIN_TABLES = [:singers, :songs, :music_types]
  enum creator: [:member, :admin]

  belongs_to :country

  has_many :avatars, dependent: :destroy
  has_many :album_music_types, dependent: :destroy
  has_many :album_singers, dependent: :destroy
  has_many :album_songs, dependent: :destroy
  has_many :music_types, through: :album_music_types
  has_many :singers, through: :album_singers
  has_many :songs, through: :album_songs
  has_many :ranks, as: :target, dependent: :destroy
  has_many :videos

  scope :filter_by_country_author, -> short_name do
    joins(:country).where("countries.short_name = ? AND albums.creator = ? AND albums.created_at = ?",
      short_name, 1, DateTime.now.beginning_of_week)
  end

  def get_rank_previous
    self.ranks.where(start_date: DateTime.now.beginning_of_week - 7.day, target_type: "album").first.number
  end

  def json_data options = {}
    options = options.deep_merge({
      include: {
        songs: {},
        singers: {only: ["id", "name"]},
        music_types: {},
      },
    })
    as_json options
  end
end
