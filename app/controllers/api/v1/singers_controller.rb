class Api::V1::SingersController < Api::BaseController
  def index
    response_success base_index_response "singers"
  end

  def create

  end

  def update
    @singer.update_attributes singer_params
    response_success singer: @singer
  end

  private
  def singer_params
    params.require(:singer).permit(Singer::ATTRIBUTES_PARAMS)
  end
end
