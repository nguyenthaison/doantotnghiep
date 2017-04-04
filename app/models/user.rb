class User < ApplicationRecord
  # devise :database_authenticatable, :registerable,
  #   :recoverable, :rememberable, :trackable, :validatable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]
end
