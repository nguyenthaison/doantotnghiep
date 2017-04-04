class Api::V1::AuthenticationController < Api::BaseController
  skip_load_and_authorize_resource

  def index
    response_success AuthenticationSerializer.new current_user
  end
end
