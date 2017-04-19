class Api::V1::PlayListsController < Api::BaseController
  def index
    response_success base_index_response "play_lists"
  end

  def create

  end

  def update
  end

  private
  def play_list_params
    params.require(:play_list).permit(:name)
  end
end
