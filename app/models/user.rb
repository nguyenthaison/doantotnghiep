class User < ApplicationRecord
  include SmartAsJson

  has_many :favorite_articles, dependent: :destroy
  has_many :play_lists, dependent: :destroy
  has_many :singers, through: :favorite_articles
  has_many :authors, through: :favorite_articles
  has_many :favorite_musics, dependent: :destroy

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable, :timeoutable, authentication_keys: [:login_id]
end
