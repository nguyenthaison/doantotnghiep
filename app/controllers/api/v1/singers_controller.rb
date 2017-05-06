class Api::V1::SingersController < Api::BaseController
  def index
    response_success base_index_response "singers"
  end

  def create
    if @singer.save
      response_success singer: @singer
    else
      response_fail @singer.errors
    end
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

  def destroy
    if @singer.destroy
      response_success
    else
      response_fail singer: @singer
    end
  end

  private
  def singer_params
    numberDay = (Time.zone.now.to_date - params[:singer][:dob].to_date).to_i
    age = (numberDay / 365).to_i
    age = {age: age}
    params.require(:singer).permit(Singer::ATTRIBUTES_PARAMS).merge(age)
  end
end
