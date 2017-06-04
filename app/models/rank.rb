class Rank < ApplicationRecord
  include SmartAsJson

  enum rank_type: [:vn, :us, :kp]

  belongs_to :target, polymorphic: true


  class << self
    def get_ranks song_id, target_type
      Rank.where(start_date: DateTime.now.beginning_of_week - 7.day, target_type: target_type,
        target_id: song_id).first.number
    end

    def get_first_day_pre_week
      DateTime.now.beginning_of_week - 7.day
    end

    def get_end_day_pre_week
      DateTime.now.beginning_of_week - 1.day
    end
  end
end
