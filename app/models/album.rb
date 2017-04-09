class Album < ApplicationRecord
  ALLOWED_METHODS = ["get_rank_previous"]

  has_many :avatars
  has_many :songs
  has_many :videos
  has_many :ranks, as: :target, dependent: :destroy
  has_many :album_singers, dependent: :destroy
  has_many :singers, through: :album_singers

  def get_rank_previous
    self.ranks.where(start_date: DateTime.now.beginning_of_week - 7.day, target_type: "album").first.number
  end
end
