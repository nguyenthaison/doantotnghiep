class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.integer :view
      t.integer :rank
      t.integer :share
      t.string :name
      t.timestamps
    end
  end
end
