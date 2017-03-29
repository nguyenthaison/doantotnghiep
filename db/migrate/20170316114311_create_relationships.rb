class CreateRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :relationships do |t|
      t.references :user, foreign: true, index: true
      t.references :singer, foreign: true, index: true
      t.text :notes
      t.timestamps
    end
  end
end
