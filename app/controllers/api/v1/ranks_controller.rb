class Api::V1::RanksController < Api::BaseController
  def index
    params[:filter][:start_date] = Rank.get_first_day_pre_week
    params[:filter][:end_date] = Rank.get_end_day_pre_week
    response_success base_index_response "ranks"
  end

  def create

  end

  def update

  end
end
