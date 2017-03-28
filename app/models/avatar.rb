class Avatar < ApplicationRecord
  belongs_to :album
  belongs_to :user
  belongs_to :singer_author
end
