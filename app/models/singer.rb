class Singer < ApplicationRecord
  include SmartAsJson
  include Search

  ATTRIBUTES_PARAMS = [:name, :age, :dob, :content, :total_favorite, :country_id, attachment_ids: []]
  # ALLOWED_METHODS = [:total_favorites, :background_image, :avatar_image]
  ALLOWED_METHODS = [:total_favorites]

  belongs_to :country

  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :singer_songs
  has_many :songs, through: :singer_songs
  has_many :artist_music_types, as: :artist, dependent: :destroy
  has_many :attachments, as: :attachmentable, dependent: :destroy

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

  # def background_image
  #   attachments.where(image_type: "background").first
  # end

  # def avatar_image
  #   attachments.where(image_type: "avatar").first
  # end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
