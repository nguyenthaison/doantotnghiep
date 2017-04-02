class CreateCountryMusicTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :country_music_types do |t|
      t.references :music_type, foreign: true, index: true
      t.references :country, foreign: true, index: true
      t.timestamps
    end
  end
end
