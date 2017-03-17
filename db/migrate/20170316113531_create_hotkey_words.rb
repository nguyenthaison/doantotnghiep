class CreateHotkeyWords < ActiveRecord::Migration[5.0]
  def change
    create_table :hotkey_words do |t|
      t.text :content
      t.timestamps
    end
  end
end
