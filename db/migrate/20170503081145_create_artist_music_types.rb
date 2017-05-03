class CreateArtistMusicTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :artist_music_types do |t|
      t.references :artist, polymorphic: true, index: true
      t.references :music_type, foreign: true, index: true
      t.timestamps
    end
  end
end
