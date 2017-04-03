class AddAttachmentToSong < ActiveRecord::Migration[5.0]
  def change
    add_attachment :songs, :attachment
  end
end
