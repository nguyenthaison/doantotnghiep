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

  def update
  end

  private
  def song_params
    params.require(:song).permit(:name)
  end
end
