class CreateMusicTypeSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :music_type_songs do |t|
      t.references :music_type, foreign: true, index: true
      t.references :song, foreign: true, index: true
      t.timestamps
    end
  end
end
