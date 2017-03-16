class CreateMusicTypes < ActiveRecord::Migration[5.0]
  def change
    create_table :music_types do |t|
      t.string :name
      t.timestamps
    end
  end
end
