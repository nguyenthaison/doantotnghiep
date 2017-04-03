namespace :db do
  desc "Remaking data"
  task remake_data: :environment do
    Rake::Task["db:migrate:reset"].invoke

    puts "create user"
    Fabricate :user, name: "son", email: "abc@gmail.com", login_id: "admin",
      password: "123456", password_confirmation: "123456"

    puts "Country"
    Fabricate :country, short_name: "vn", full_name: "Viet Nam"
    Fabricate :country, short_name: "us", full_name: "American"

    puts "Singer"
    Fabricate :singer, name: "LK", age: 20, content: "khong co gi",countries_id: 1
    Fabricate :singer, name: "phuong anh", age: 30, content: "khong co gi",countries_id: 1
    Fabricate :singer, name: "vu cat tuong", age: 40, content: "khong co gi",countries_id: 1
    Fabricate :singer, name: "Native Tongue", age: 50, content: "khong co gi",countries_id: 2
    Fabricate :singer, name: "trung quan", age: 35, content: "khong co gi",countries_id: 1
    Fabricate :singer, name: "quang le", age: 25, content: "khong co gi",countries_id: 1

    puts "author"
    5.times do |i|
      Fabricate :singer, name: "author #{i}", age: i * 12, content: "khong co gi",countries_id: 1
    end

    puts "Music type"
    Fabricate :music_type, name: "nhac tre"
    Fabricate :music_type, name: "rock"
    Fabricate :music_type, name: "Pop"
    Fabricate :music_type, name: "Rap"
    Fabricate :music_type, name: "country"
    Fabricate :music_type, name: "thieu nhi"
    Fabricate :music_type, name: "blue"

    puts "Country music type"
    Fabricate :country_music_type, music_type_id: 1, country_id: 1
    Fabricate :country_music_type, music_type_id: 2, country_id: 1
    Fabricate :country_music_type, music_type_id: 2, country_id: 2
    Fabricate :country_music_type, music_type_id: 3, country_id: 1
    Fabricate :country_music_type, music_type_id: 3, country_id: 2
    Fabricate :country_music_type, music_type_id: 4, country_id: 1
    Fabricate :country_music_type, music_type_id: 4, country_id: 2
    Fabricate :country_music_type, music_type_id: 5, country_id: 2
    Fabricate :country_music_type, music_type_id: 6, country_id: 1
    Fabricate :country_music_type, music_type_id: 7, country_id: 2

    puts "music type song"
    Fabricate :music_type_song, music_type_id: 1, song_id: 2
    Fabricate :music_type_song, music_type_id: 3, song_id: 1
    Fabricate :music_type_song, music_type_id: 3, song_id: 2
    Fabricate :music_type_song, music_type_id: 4, song_id: 1
    Fabricate :music_type_song, music_type_id: 7, song_id: 3

    puts "Album"
    5.times do |i|
      Fabricate :album, view: i * 20, rank: i, share: i * 20, name: "Album #{i}"
    end

    puts "Song"
    Fabricate :song, name: "Ngoi Sao Le Loi Lonely Star", view: 10, song_type: 1,
      download: 100, album_id: 1, user_id: 1,
      link: "samples/Ngoi Sao Le Loi Lonely Star - LK P A JustaTee.mp3"
    Fabricate :song, name: "Em oi", view: 10, song_type: 1, download: 100, album_id: 1,
      user_id: 1, link: "samples/Em-Oi-Vu-Cat-Tuong-Hakoota-Dung-Ha.mp3"
    Fabricate :song, name: "Quinn XCII", view: 10, song_type: 1, download: 100, album_id: 1,
      user_id: 1,
      link: "samples/Quinn XCII - Native Tongue (Prod. by ayokay) ( www.Mp3Zone.co ).mp3"
    Fabricate :song, name: "Mo", view: 10, song_type: 1, download: 100, album_id: 1,
      user_id: 1, link: "samples/Mo - Vu Cat Tuong.mp3"
    Fabricate :song, name: "Trai Dat Tron Khong Gi La Khong The", view: 10, song_type: 1, download: 100, album_id: 1,
      user_id: 1, link: "samples/Trai Dat Tron Khong Gi La Khong The - Trung Quan Idol.mp3"
    Fabricate :song, name: "Xuan nay con khong ve", view: 10, song_type: 1, download: 100, album_id: 1,
      user_id: 1, link: "samples/XuanNayConKhongVe-QuangLe-1428282.mp3"

    puts "Success remake data"
  end
end
