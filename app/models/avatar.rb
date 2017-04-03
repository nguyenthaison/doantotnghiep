class Avatar < ApplicationRecord
  belongs_to :album
  belongs_to :user
  belongs_to :singer
  belongs_to :author
end
