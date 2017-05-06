class Api::V1::SongsController < Api::BaseController
  def index
    response_success base_index_response "songs"
  end

  def create
    song = Song.new(attachment: params[:attachment], name: params[:name],
      user_id: current_user.id)
    if song.save
      ActiveRecord::Base.transaction do
        begin
          song.create_singer_lyric params, current_user
          response_success song: song
        rescue
          response_fail
        end
      end
    else
      response_fail song.errors
    end
  end

  def show
    as_json_include = JSON.parse(params[:include] || "").deep_symbolize_keys
    eager_load_include = ConvertJsonService.convert_to_eager_load_include as_json_include

    constant_name = controller_name.classify.constantize
    obj = constant_name.includes(constant_name::JOIN_TABLES).includes(eager_load_include)
      .find params[:id]
    response = {
      song: obj.json_data({include: as_json_include}),
    }
    response_success response
  end

  def update
  end

  def download
    song = Song.find_by id: params[:id]

    if song
      send_file(
        Rails.root + "public" + song.link,
        type: "audio/mp3",
        disposition: "attachment",
        x_sendfile: true,
        filename: song.name)
    end
  end

  private
  def song_params
    params.require(:song).permit(:name)
  end
end
