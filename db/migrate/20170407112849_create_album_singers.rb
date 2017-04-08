class CreateAlbumSingers < ActiveRecord::Migration[5.0]
  def change
    create_table :album_singers do |t|
      t.references :album, index: true, foreign: true
      t.references :singer, index: true, foreign: true
      t.timestamps
    end
  end
end
