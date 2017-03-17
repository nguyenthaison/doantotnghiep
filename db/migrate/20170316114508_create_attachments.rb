class CreateAttachments < ActiveRecord::Migration[5.0]
  def change
    create_table :attachments do |t|
      t.string :name
      t.integer :view
      t.integer :song_type
      t.integer :rank
      t.integer :download
      t.references :user, foreign: true, index: true
      t.references :singer_author, foreign: true, index: true
      t.references :music_type, foreign: true, index: true
      t.references :attachmentable, polymorphic: true, index: true
      t.references :album, foreign: true, index: true
      t.text :notes
      t.timestamps
    end
  end
end
