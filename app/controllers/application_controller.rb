class ApplicationController < ActionController::Base
  # before_action :authenticate_user!
  protect_from_forgery
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit :sign_up, keys: [
      :email, :login_id, :phone_number, :name, :dob, :country_id]
  end
end
