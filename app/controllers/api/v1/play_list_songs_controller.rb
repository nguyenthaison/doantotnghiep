class Api::V1::PlayListSongsController < Api::BaseController
  def index
    response_success base_index_response "play_list_songs"
  end

  def create
    if @play_list_song.save
      response_success play_list_song: @play_list_song
    else
      response_fail @play_list_song.errors
    end
  end

  def destroy
    if @play_list_song.destroy
      response_success
    else
      response_fail play_list_song: @play_list_song.errors
    end
  end

  private
  def play_list_song_params
    params.require(:play_list_song).permit(PlayListSong::ATTRIBUTE_PARAMS)
  end
end
