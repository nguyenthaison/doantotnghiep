class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.integer :role
      t.string :mail
      t.string :phone_number
      t.date :dob
      t.references :country, index: true, foreign: true
      t.timestamps
    end
  end
end
