class CreateUserRanks < ActiveRecord::Migration[5.0]
  def change
    create_table :user_ranks do |t|
      t.references :song, foreign: true, index: true
      t.references :rank, foreign: true, index: true
      t.integer :rank
      t.timestamps
    end
  end
end
