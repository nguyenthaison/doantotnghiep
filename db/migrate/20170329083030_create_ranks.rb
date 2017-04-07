class CreateRanks < ActiveRecord::Migration[5.0]
  def change
    create_table :ranks do |t|
      t.integer :number
      t.datetime :start_date
      t.datetime :end_date
      t.string :view_start
      t.string :view_end
      t.integer :total_view
      t.references :target, polymorphic: true, index: true
      t.timestamps
    end
  end
end
