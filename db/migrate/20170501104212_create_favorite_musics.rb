class CreateFavoriteMusics < ActiveRecord::Migration[5.0]
  def change
    create_table :favorite_musics do |t|
      t.references :user, foreign: true, index: true
      t.references :song, foreign: true, index: true
      t.timestamps
    end
  end
end
