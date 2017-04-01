class Api::V1::SongsController < Api::BaseController
  def index
    response_success base_index_response "songs"
  end

  def create
    byebug
    song = Song.new attachment: params[:attachment]

    if song.save
      # manual_file.update link_file: "#{root_url}api/v1/download/#{manual_file.id}"
      response_success song: song
    else
      response_fail
    end
  end

  def update

  end
end
