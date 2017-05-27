class Api::V1::UsersController < Api::BaseController
  def index
    response_success base_index_response "users"
  end

  def create
    if @user.save
      response_success user: @user
    else
      response_fail @user.errors
    end
  end

  def update

  end

  def update_password
    @user = current_user
    if @user.update_with_password user_params.merge({present_pass: true})
      bypass_sign_in @user
      response_success @user
    else
      response_fail @user.errors
    end
  end

  private
  def user_params
    params.require(:user).permit(User::ATTRIBUTES_PARAMS)
  end
end
