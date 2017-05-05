class CreateSingers < ActiveRecord::Migration[5.0]
  def change
    create_table :singers do |t|
      t.string :name
      t.integer :age
      t.datetime :dob
      t.text :content
      t.integer :total_favorite
      t.references :country, foreign: true, index: true
      t.timestamps
    end
  end
end
