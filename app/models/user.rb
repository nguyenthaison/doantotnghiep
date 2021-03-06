class User < ApplicationRecord
  include SmartAsJson
  include Search

  ATTRIBUTES_PARAMS = [:name, :role, :password, :password_confirmation, :email,
    :phone_number, :dob, :country_id, :login_id]

  enum role: [:guest, :member, :admin]

  has_many :favorite_articles, dependent: :destroy
  has_many :play_lists, dependent: :destroy
  has_many :singers, through: :favorite_articles
  has_many :authors, through: :favorite_articles
  has_many :favorite_musics, dependent: :destroy

  validates :login_id, :password, :password_confirmation, :name, presence: true
  validates :login_id, uniqueness: true

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]

  delegate :can?, :cannot?, to: :ability

  def ability
    @ability ||= Ability.new self
  end
end
