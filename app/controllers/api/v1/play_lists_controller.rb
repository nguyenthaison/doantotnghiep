class Api::V1::PlayListsController < Api::BaseController
  def index
    response_success base_index_response "play_lists"
  end

  def create
    if @play_list.save
      response_success play_list: @play_list
    else
      response_fail @play_list.errors
    end
  end

  def update
    if @play_list.update_attributes play_list_params
      response_success play_list: @play_list
    else
      response_fail @play_list.errors
    end
  end

  def destroy
    if @play_list.destroy
      response_success
    else
      response_fail play_list: @play_list.errors
    end
  end

  private
  def play_list_params
    params.require(:play_list).permit(PlayList::ATTRIBUTE_PARAMS).merge(user_id)
  end
end
