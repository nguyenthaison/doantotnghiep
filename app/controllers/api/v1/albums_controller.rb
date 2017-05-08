class Api::V1::AlbumsController < Api::BaseController
  def index
    response_success base_index_response "albums"
  end

  def create
    byebug
    if @album.save
      response_success album: @album
    else
      response_fail @album.errors
    end
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include

    constant_name = controller_name.classify.constantize
    obj = constant_name.includes(constant_name::JOIN_TABLES).includes(eager_load_include)
      .find params[:id]
    response = {
      album: obj.json_data({include: as_json_include}),
    }
    response_success response
  end

  def update

  end

  private
  def album_params
    params.require(:album).permit(Album::ATTRIBUTES_PARAMS)
  end
end
