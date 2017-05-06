class Comment < ApplicationRecord
  include SmartAsJson

  belongs_to :user
  belongs_to :attachment
end
