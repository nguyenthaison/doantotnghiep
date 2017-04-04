class CreateRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :relationships do |t|
      t.integer :user_id
      t.references :singer, foreign: true, index: true
      t.text :notes
      t.timestamps
    end
  end
end
