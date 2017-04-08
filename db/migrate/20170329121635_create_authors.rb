class CreateAuthors < ActiveRecord::Migration[5.0]
  def change
    create_table :authors do |t|
      t.string :name
      t.integer :age
      t.date :dob
      t.text :content
      t.integer :total_favorite
      t.references :countries, foreign: true, index: true
      t.timestamps
    end
  end
end
