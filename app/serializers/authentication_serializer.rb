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
    guest_auth = {
      home: true,
      subjects: true,
      song: true,
      album: true,
      singers: true,
      albums: true,
      artists: true,
      ranks: true,
      songs: true,
      authors: true,
      personal: {
        PlayListDetail: true,
      },
      upload: true,
      search: {
        songs: true,
      }
    }

    member_auth = guest_auth.deep_merge({

    })

    admin_auth = member_auth.deep_merge({
      admin: {
        singers: true,
        albums: true,
        authors: true,
        songs: true,
        users: true,
      },
    })

    role = object&.role || "guest"
    eval "#{role}_auth"
  end
end
