class CreateClaims < ActiveRecord::Migration[5.0]
  def change
    create_table :claims do |t|
      t.string :title
      t.text :content
      t.timestamps
    end
  end
end
