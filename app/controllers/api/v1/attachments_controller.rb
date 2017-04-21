class Api::V1::AttachmentsController < Api::BaseController
  skip_load_and_authorize_resource

  def create
    attachment = Attachment.new attachment: params[:attachment]
    if attachment.save
      response_success attachment: attachment.as_json()
    else
      response_fail attachment.errors.messages.except :attachment
    end
  end
end
