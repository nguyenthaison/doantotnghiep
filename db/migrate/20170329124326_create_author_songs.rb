class CreateAuthorSongs < ActiveRecord::Migration[5.0]
  def change
    create_table :author_songs do |t|
      t.references :song, foreign: true, index: true
      t.references :author, foreign: true, index: true
      t.timestamps
    end
  end
end
