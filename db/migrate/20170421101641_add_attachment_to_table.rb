class AddAttachmentToTable < ActiveRecord::Migration[5.0]
  def change
    add_attachment :attachments, :attachment
  end
end
