class CreateAvatars < ActiveRecord::Migration[5.0]
  def change
    create_table :avatars do |t|
      t.string :avatar
      t.integer :user_id
      t.references :singer, foreign: true, index: true
      t.references :album, foreign: true, index: true
      t.timestamps
    end
  end
end
