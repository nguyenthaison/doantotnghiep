class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.integer :view
      t.integer :share
      t.string :name
      t.integer :creator
      t.string :album_type  #system, singer
      t.integer :country_id
      t.text :notes
      t.timestamps
    end
  end
end
