class CreateSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :songs do |t|
      t.string :name
      t.integer :view
      t.integer :song_type
      t.integer :rank
      t.integer :download
      t.string :link
      t.integer :author_id
      t.references :album, foreign: true, index: true
      t.references :user, foreign: true, index: true
      t.references :singer, foreign: true, index: true
      t.timestamps
    end
  end
end
