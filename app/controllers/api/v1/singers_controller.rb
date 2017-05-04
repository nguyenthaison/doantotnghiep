class Api::V1::SingersController < Api::BaseController
  def index
    response_success base_index_response "singers"
  end

  def create

  end

  def show
    # as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    # eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include

    # constant_name = controller_name.classify.constantize
    # obj = constant_name.includes(constant_name::JOIN_TABLES).includes(eager_load_include)
    #   .find params[:id]
    # response = {
    #   album: obj.json_data({include: as_json_include}),
    # }
    response_success singer: @singer
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
