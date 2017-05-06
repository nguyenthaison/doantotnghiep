class Rank < ApplicationRecord
  include SmartAsJson

  enum rank_type: [:vn, :us, :kp]

  belongs_to :target, polymorphic: true

  class << self
    def get_first_day_pre_week
      DateTime.now.beginning_of_week - 7.day
    end

    def get_end_day_pre_week
      DateTime.now.beginning_of_week - 1.day
    end
  end
end
