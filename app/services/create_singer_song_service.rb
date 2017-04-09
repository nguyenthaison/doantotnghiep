# class CreateSingerSongService
#   attr_reader :song, :params, :param_permit, :current_user

#   def initialize(params, current_user)
#     @params = params
#     @current_user = current_user
#   end

#   def create_song_associate
#     ActiveRecord::Base.transaction do
#       begin
#         song = Song.create(attachment: params[:attachment],
#           name: params[:song_name], user_id: current_user.id)
#         Lyric.Create(content: params[:lyric_content], user_id: current_user.id, song_id: song.id)
#         Singer.Create(name: params[:singer_name])
#         params[:music_type_song_ids].each do |item|
#           MusicTypeSong.Create(music_type_id: item, song_id: song.id)
#         end
#       end
#     end
#   end
# end
