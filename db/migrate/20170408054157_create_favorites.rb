class CreateFavorites < ActiveRecord::Migration[5.0]
  def change
    create_table :favorites do |t|
      t.integer :favorite
      t.timestamps :start_date
      t.timestamps :end_date
      t.references :artist, polymorphic: true, index: true
      t.timestamps
    end
  end
end
