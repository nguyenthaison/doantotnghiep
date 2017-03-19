class CreateAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :attachments do |t|
      t.integer :attachmentable_id
      t.text :notes
      t.timestamps
    end
  end
end
