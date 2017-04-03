class CreateRanks < ActiveRecord::Migration[5.0]
  def change
    create_table :ranks do |t|
      t.integer :rank_type
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
