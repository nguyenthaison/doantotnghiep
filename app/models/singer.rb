class Singer < ApplicationRecord
  include SmartAsJson

  ATTRIBUTES_PARAMS = [:name, :age, :dob, :content, :total_favorite, :country_id]
  ALLOWED_METHODS = [:total_favorites]

  belongs_to :country

  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :singer_songs
  has_many :songs, through: :singer_songs
  has_many :artist_music_types, as: :artist, dependent: :destroy

  validates :name, presence: true, length: {maximum: 100, minimum: 1}
  validates :dob, :country_id, presence: true
  validate :dob_must_be_before_or_equal_current_date

  def total_favorites
    favorite_articles.size
  end

  def dob_must_be_before_or_equal_current_date
    if dob.to_date >= Time.zone.now.to_date
      errors.add :dob, I18n.t("companies.errors.start_must_before_end_date")
    end
  end
end
