class CreateAlbumSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :album_songs do |t|
      t.references :album, foreign: true
      t.references :song, foreign: true
      t.timestamps
    end
  end
end
