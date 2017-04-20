class CreatePlayLists < ActiveRecord::Migration[5.0]
  def change
    create_table :play_lists do |t|
      t.string :name
      t.integer :view
      t.text :describe
      t.references :user, index: true, foreign: true
      t.timestamps
    end
  end
end
