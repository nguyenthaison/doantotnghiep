class CreateSingerSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :singer_songs do |t|
      t.references :song, foreign: true, index: true
      t.references :singer, foreign: true, index: true
      t.timestamps
    end
  end
end
