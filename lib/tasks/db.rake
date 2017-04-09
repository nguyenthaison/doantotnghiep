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
    Fabricate :singer, name: "LK", age: 20, content: "khong co gi", countries_id: 1,  total_favorite: 110
    Fabricate :singer, name: "phuong anh", age: 30, content: "khong co gi", countries_id: 1,  total_favorite: 120
    Fabricate :singer, name: "vu cat tuong", age: 40, content: "khong co gi", countries_id: 1,  total_favorite: 130
    Fabricate :singer, name: "Native Tongue", age: 50, content: "khong co gi", countries_id: 2,  total_favorite: 140
    Fabricate :singer, name: "trung quan", age: 35, content: "khong co gi", countries_id: 1,  total_favorite: 150
    Fabricate :singer, name: "quang le", age: 25, content: "khong co gi", countries_id: 1,  total_favorite: 160
    Fabricate :singer, name: "miu le", age: 25, content: "khong co gi", countries_id: 1,  total_favorite: 170
    Fabricate :singer, name: "Lou Hoang", age: 25, content: "khong co gi", countries_id: 1,  total_favorite: 180
    Fabricate :singer, name: "phan manh quynh", age: 25, content: "khong co gi", countries_id: 1,  total_favorite: 190
    Fabricate :singer, name: "soo bin hoang son", age: 25, content: "khong co gi", countries_id: 1,  total_favorite: 200

    puts "author"
    5.times do |i|
      Fabricate :singer, name: "author #{i}", age: i * 12, content: "khong co gi", countries_id: 1,  total_favorite: 100
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
    10.times do |i|
      Fabricate :album, view: i * 20, rank: i + 1, share: i * 20, name: "Album #{i + 1}"
    end

    puts "Song"
    Fabricate :song, name: "Ngoi Sao Le Loi Lonely Star", view: 10, song_type: 1,
      download: 10000, album_id: 1, user_id: 1,
      link: "samples/Ngoi Sao Le Loi Lonely Star - LK P A JustaTee.mp3", country_id: 1
    Fabricate :song, name: "Em oi", view: 10, song_type: 1, download: 10200, album_id: 2,
      user_id: 1, link: "samples/Em-Oi-Vu-Cat-Tuong-Hakoota-Dung-Ha.mp3", country_id: 1
    Fabricate :song, name: "Quinn XCII", view: 10, song_type: 1, download: 10040, album_id: 3,
      user_id: 1,
      link: "samples/Quinn XCII - Native Tongue (Prod. by ayokay) ( www.Mp3Zone.co ).mp3", country_id: 1
    Fabricate :song, name: "Mo", view: 10, song_type: 1, download: 104500, album_id: 4,
      user_id: 1, link: "samples/Mo - Vu Cat Tuong.mp3", country_id: 1
    Fabricate :song, name: "Trai Dat Tron Khong Gi La Khong The", view: 10, song_type: 1, download: 104560, album_id: 5,
      user_id: 1, link: "samples/Trai Dat Tron Khong Gi La Khong The - Trung Quan Idol.mp3", country_id: 1
    Fabricate :song, name: "Xuan nay con khong ve", view: 10, song_type: 1, download: 104508, album_id: 6,
      user_id: 1, link: "samples/XuanNayConKhongVe-QuangLe-1428282.mp3", country_id: 1
    Fabricate :song, name: "Yeu mot nguoi co le", view: 10, song_type: 1, download: 134500, album_id: 7,
      user_id: 1, link: "samples/Yeu Mot Nguoi Co Le - Lou Hoang Miu Le.mp3", country_id: 1
    Fabricate :song, name: "Va the la het", view: 10, song_type: 1, download: 1045054, album_id: 8,
      user_id: 1, link: "samples/Va-The-La-Het-Soobin-Hoang-Son.mp3", country_id: 1
    Fabricate :song, name: "Con tim vo tan", view: 10, song_type: 1, download: 1045057, album_id: 9,
      user_id: 1, link: "samples/Con-Tim-Tan-Vo-Phan-Manh-Quynh.mp3", country_id: 1
    Fabricate :song, name: "Co gai ngay hom qua", view: 10, song_type: 1, download: 2145057, album_id: 10,
      user_id: 1, link: "samples/Co-Gai-Ngay-Hom-Qua-Co-Gai-Den-Tu-Hom-Qua-OST-Vu-Cat-Tuong.mp3", country_id: 1


    puts "singer_song"
    Fabricate :singer_song, song_id: 1, singer_id: 1
    Fabricate :singer_song, song_id: 1, singer_id: 2
    Fabricate :singer_song, song_id: 2, singer_id: 3
    Fabricate :singer_song, song_id: 3, singer_id: 4
    Fabricate :singer_song, song_id: 5, singer_id: 5
    Fabricate :singer_song, song_id: 6, singer_id: 6
    Fabricate :singer_song, song_id: 7, singer_id: 7
    Fabricate :singer_song, song_id: 7, singer_id: 8
    Fabricate :singer_song, song_id: 9, singer_id: 9
    Fabricate :singer_song, song_id: 8, singer_id: 10
    Fabricate :singer_song, song_id: 10, singer_id: 3
    Fabricate :singer_song, song_id: 4, singer_id: 3

    puts "album singer"
    Fabricate :album_singer, album_id: 1, singer_id: 1
    Fabricate :album_singer, album_id: 1, singer_id: 2
    Fabricate :album_singer, album_id: 2, singer_id: 3
    Fabricate :album_singer, album_id: 3, singer_id: 4
    Fabricate :album_singer, album_id: 4, singer_id: 5
    Fabricate :album_singer, album_id: 5, singer_id: 6
    Fabricate :album_singer, album_id: 6, singer_id: 7
    Fabricate :album_singer, album_id: 7, singer_id: 8
    Fabricate :album_singer, album_id: 8, singer_id: 9
    Fabricate :album_singer, album_id: 9, singer_id: 10
    Fabricate :album_singer, album_id: 10, singer_id: 1
    Fabricate :album_singer, album_id: 10, singer_id: 3

    puts "create rank"
    10.times do |i|
      Fabricate :rank, number: i + 1, view_start: 10, view_end: 20 + i, target_type: "song", target_id: i + 1, total_view: 10 +i
      Fabricate :rank, number: i + 1, view_start: 10, view_end: 20 + i, target_type: "album", target_id: i + 1, total_view: 10 +i
    end

    puts "Success remake data"
  end
end
