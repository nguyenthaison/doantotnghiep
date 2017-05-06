class Attachment < ApplicationRecord
  include SmartAsJson

  IMAGE_TYPES = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
  ALLOWED_METHODS = [:url]

  has_attached_file :attachment,
    styles: lambda {|a| a.instance.get_style},
    restricted_characters: false

  belongs_to :attachmentable, polymorphic: true

  validates_attachment_content_type :attachment,
    content_type: IMAGE_TYPES

  def get_style
    {thumb: "256x256"}
  end

  def as_json options={}
    super.merge({
      url: attachment.url,
      # thumb_url: attachment.url(:thumb),
    })
  end

  def url
    self.attachment.url
  end
end
