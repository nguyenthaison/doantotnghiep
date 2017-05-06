class CreatePlayListSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :play_list_songs do |t|
      t.references :play_list, foreign: true, index: true
      t.references :song, foreign: true, index: true
      t.timestamps
    end
  end
end
