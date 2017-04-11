class CreateAlbumMusicTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :album_music_types do |t|
      t.references :album, index: true, foreign: true
      t.references :music_type, index: true, foreign: true
      t.timestamps
    end
  end
end
