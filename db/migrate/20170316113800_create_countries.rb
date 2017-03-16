class CreateCountries < ActiveRecord::Migration[5.0]
  def change
    create_table :countries do |t|
      t.string :short_name
      t.string :full_name
      t.timestamps
    end
  end
end
