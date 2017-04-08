class CreateMusicTypePlayLists < ActiveRecord::Migration[5.0]
  def change
    create_table :music_type_play_lists do |t|
      t.references :music_type, index: true, foreign: true
      t.references :play_list, index: true, foreign: true
      t.timestamps
    end
  end
end
