class User < ApplicationRecord
  has_many :favorite_articles, dependent: :destroy
  has_many :singers, through: :favorite_articles
  has_many :authors, through: :favorite_articles

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]
end
