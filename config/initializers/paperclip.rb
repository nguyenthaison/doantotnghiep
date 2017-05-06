require "digest/sha1"

Paperclip.interpolates :custom_filename do |attachment, style|
  attachment.original_filename
end
