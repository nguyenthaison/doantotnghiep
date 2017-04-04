class Api::V1::SessionsController < Api::BaseController
  include Devise::Controllers::SignInOut
  skip_before_action :authenticate_user!
  skip_load_and_authorize_resource

  def create
    user = User.where("lower(login_id) = ?", params[:login_id].downcase).first
    byebug
    if !user || !user.valid_password?(params[:password])
      response_when_invalid_login
    else
      sign_in "user", user
      response_success
    end
  end

  private
  def response_when_invalid_login
    response_fail t("errors.sessions.invalid_login")
  end

  def response_when_user_has_no_permission
    response_fail t("errors.sessions.inactive")
  end
end
