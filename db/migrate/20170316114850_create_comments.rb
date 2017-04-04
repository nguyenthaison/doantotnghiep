class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :like
      t.integer :unlike
      t.text :content
      t.integer :user_id
      t.references :attachment, foreign: true, index: true
      t.timestamps
    end
  end
end
