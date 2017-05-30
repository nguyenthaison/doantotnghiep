class User < ApplicationRecord
  include SmartAsJson
  include Search
  include Validator

  attr_accessor :present_pass, :current_role

  ATTRIBUTES_PARAMS = [:name, :role, :password, :password_confirmation, :email,
    :phone_number, :dob, :country_id, :login_id]

  enum role: [:guest, :member, :admin]

  has_many :favorite_articles, dependent: :destroy
  has_many :play_lists, dependent: :destroy
  has_many :singers, through: :favorite_articles
  has_many :authors, through: :favorite_articles
  has_many :favorite_musics, dependent: :destroy

  validates :login_id, uniqueness: {case_sensitive: false}, presence: true, length: {maximum: 20},
    format: {with: VALID_LOGIN_ID_REGEX}
  validates :password, length: {minimum: 6, maximum: 20}, allow_nil: true,
    format: {with: VALID_PASSWORD_REGEX}, if: proc {password.present?}
  validates :password, presence: true, if: proc {present_pass}
  validates :password_confirmation, presence: true, if: proc {present_pass}

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]

  delegate :can?, :cannot?, to: :ability

  def ability
    @ability ||= Ability.new self
  end
end
