namespace :db do
  desc "Remaking data"
  task remake_data: :environment do
    Rake::Task["db:migrate:reset"].invoke

    puts "Creating Admin"
    user = Fabricate :user, role: 2, email: "admin@framgia.com",
      name: "Admin", login_id: "Admin"

    puts "Creating member"
    5.times do |i|
      Fabricate :user, role: 0, email: "member#{i}@framgia.com",
        login_id: "Member#{i}"
    end

    puts "Creating Client"
    30.times do |i|
      Fabricate :client, name: "client-#{i + 1}", short_name: "F#{i}",
        address: "ha noi", phone_number: "012345678#{i}", creator_id: User.first.id,
        updater_id: User.first.id, code: "F000000#{i}"
    end

    puts "Creating Line"
    30.times do |i|
      Fabricate :line, name: "line-#{i + 1}", client_id: i + 1, code: "F000000#{i}"
    end

    puts "Success remake data"
  end


end
