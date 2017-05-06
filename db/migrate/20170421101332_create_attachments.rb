class CreateAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :attachments do |t|
      t.string :image_type
      t.references :attachmentable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
