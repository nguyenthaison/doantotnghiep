class Author < ApplicationRecord
  include SmartAsJson
  include Search

  ALLOWED_METHODS = [:total_favorites]

  belongs_to :country

  has_many :author_songs, dependent: :destroy
  has_many :favorite_articles, as: :article, dependent: :destroy
  has_many :songs, through: :author_songs
  has_many :artist_music_types, as: :artist, dependent: :destroy
  has_many :attachments, as: :attachmentable, dependent: :destroy
  has_many :background_attachments, -> {where(attachmentable_type: "background")},
    class_name: Attachment.name, foreign_key: "attachmentable_id"

  validates :name, presence: true, length: {maximum: 100, minimum: 1}
  validates :dob, :country_id, presence: true
  validate :dob_must_be_before_or_equal_current_date

  after_save :update_background_attachments

  def total_favorites
    favorite_articles.size
  end

  private
  def update_background_attachments
    if self.background_attachment_ids.present?
      current_ids = self.background_attachments.pluck(:id).map {|id| id.to_s}
      not_change_ids = current_ids & background_attachment_ids
      add_more_ids = background_attachment_ids - not_change_ids
      remove_ids = current_ids - not_change_ids

      Attachment.where("id IN (?)" , add_more_ids).
        update_all attachmentable_id: id, attachmentable_type: "background"

      Attachment.where("id IN (?)" , remove_ids).
        update_all attachmentable_id: nil
    end
  end

  class << self
    def search_by_query query
      fields = {id: "eq", name: "like"}
      search_follow_field query, fields
    end
  end
end
