class CreateSongRanks < ActiveRecord::Migration[5.0]
  def change
    create_table :song_ranks do |t|
      t.references :song, foreign: true, index: true
      t.references :rank, foreign: true, index: true
      t.integer :rank
      t.string :view_start
      t.string :view_end
      t.timestamps
    end
  end
end
