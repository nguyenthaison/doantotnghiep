class CreateSingers < ActiveRecord::Migration[5.0]
  def change
    create_table :singers do |t|
      t.string :name
      t.integer :age
      t.date :dob
      t.text :content
      t.references :countries, foreign: true, index: true
      t.timestamps
    end
  end
end
