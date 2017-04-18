class AuthenticationSerializer < ActiveModel::Serializer
  attributes :id, :name, :authorized_pages, :role, :environment

  def initialize user, options={}
    super
    @options = options
  end

  def environment
    Rails.env
  end

  def authorized_pages
    member_auth = {
      song: true,
      album: true,
      singers: true,
    }

    # role = object.admin? && @options[:field_id] ? "manager" : object.role
    # eval "#{role}_auth"
  end
end
