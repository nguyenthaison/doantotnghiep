class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new # guest user (not logged in)
    #Admin
    if user.role == "admin"
      can :manage, :all
    # member
    elsif user.role == "member"
      can :read, :all
      can :manage, :playlist
      can :create, :song
    #guest
    else
      can :read, :all
      can :index, :all
      cannot [:create, :update, :destroy], [Singer, Author, Song, Album]
    end
  end
end
