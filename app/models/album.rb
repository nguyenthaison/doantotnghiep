class Album < ApplicationRecord
  ALLOWED_METHODS = ["get_rank_previous"]
  JOIN_TABLES = [:singers, :songs, :music_types]

  has_many :avatars, dependent: :destroy
  has_many :album_music_types, dependent: :destroy
  has_many :album_singers, dependent: :destroy
  has_many :music_types, through: :album_music_types
  has_many :singers, through: :album_singers
  has_many :songs
  has_many :ranks, as: :target, dependent: :destroy
  has_many :videos

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
