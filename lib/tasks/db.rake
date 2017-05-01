namespace :db do
  desc "Remaking data"
  task remake_data: :environment do
    Rake::Task["db:migrate:reset"].invoke

    puts "create user"
    user = Fabricate :user, name: "son", email: "abc@gmail.com", login_id: "admin",
      password: "123456", password_confirmation: "123456"

    puts "create favorite music"
    Fabricate :play_list, name: "Favorite Song", user_id: user.id, play_list_type: "Favorite"

    puts "Country"
    Fabricate :country, short_name: "vn", full_name: "Viet Nam"
    Fabricate :country, short_name: "us", full_name: "American"
    Fabricate :country, short_name: "kp", full_name: "Korean"

    puts "Singer"
    Fabricate :singer, name: "LK", age: 20, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 110
    Fabricate :singer, name: "phuong anh", age: 30, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 120
    Fabricate :singer, name: "vu cat tuong", age: 40, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 130
    Fabricate :singer, name: "Native Tongue", age: 50, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 2,  total_favorite: 140
    Fabricate :singer, name: "trung quan", age: 35, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 150
    Fabricate :singer, name: "quang le", age: 25, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 160
    Fabricate :singer, name: "miu le", age: 25, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 170
    Fabricate :singer, name: "Lou Hoang", age: 25, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 180
    Fabricate :singer, name: "phan manh quynh", age: 25, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 190
    Fabricate :singer, name: "soo bin hoang son", age: 25, content: "Tại Hà Nội.
        Emily được biết đến từ Giải nhất cuộc thi Miss Audition năm 2007,
        là hot girl,người mẫu ảnh và bắt đầu con đường ca hát từ năm 2010.
        Cô theo đuổi dòng nhạc Hiphop/R&B và tham gia trong Ladykillah-
        một nhóm các Rapper,Singer đình đám của dòng nhạc Hiphop Underground tại Hà Nội.
        Giọng hát trong,dễ thương và phong cách cá tính,trẻ trung Emily được các
        bạn trẻ yêu thích và ủng hộ,có thể kể đến các bài hát như: Xin anh đừng,
        Tình cờ, Ngọn nến trước gió,Quên đi....", countries_id: 1,  total_favorite: 200

    puts "author"
    10.times do |i|
      Fabricate :author, name: "author #{i}", age: i * 12, content: "khong co gi", countries_id: 1,  total_favorite: 100
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
      Fabricate :album, view: i * 20, share: i * 20, name: "Album #{i + 1}", creator: 0, country_id: 1,
        created_at: DateTime.now.beginning_of_week
    end
    Fabricate :album, view: 200, share: 10 * 21, name: "BXH viet nam", creator: 1, country_id: 1,
      created_at: DateTime.now.beginning_of_week
    Fabricate :album, view: 300, share: 10 * 22, name: "BXH au my", creator: 1, country_id: 2,
      created_at: DateTime.now.beginning_of_week
    Fabricate :album, view: 400, share: 10 * 23, name: "BXH han quoc", creator: 1, country_id: 3,
      created_at: DateTime.now.beginning_of_week

    puts "Song"
    Fabricate :song, name: "Ngoi Sao Le Loi Lonely Star", view: 10, song_type: 1,
      download: 10000, user_id: 1,
      link: "samples/Ngoi Sao Le Loi Lonely Star - LK P A JustaTee.mp3", country_id: 1
    Fabricate :song, name: "Em oi", view: 10, song_type: 1, download: 10200,
      user_id: 1, link: "samples/Em-Oi-Vu-Cat-Tuong-Hakoota-Dung-Ha.mp3", country_id: 1
    Fabricate :song, name: "Quinn XCII", view: 10, song_type: 1, download: 10040,
      user_id: 1,
      link: "samples/Quinn XCII - Native Tongue (Prod. by ayokay) ( www.Mp3Zone.co ).mp3", country_id: 1
    Fabricate :song, name: "Mo", view: 10, song_type: 1, download: 104500,
      user_id: 1, link: "samples/Mo - Vu Cat Tuong.mp3", country_id: 1
    Fabricate :song, name: "Trai Dat Tron Khong Gi La Khong The", view: 10, song_type: 1, download: 104560,
      user_id: 1, link: "samples/Trai Dat Tron Khong Gi La Khong The - Trung Quan Idol.mp3", country_id: 1
    Fabricate :song, name: "Xuan nay con khong ve", view: 10, song_type: 1, download: 104508,
      user_id: 1, link: "samples/XuanNayConKhongVe-QuangLe-1428282.mp3", country_id: 1
    Fabricate :song, name: "Yeu mot nguoi co le", view: 10, song_type: 1, download: 134500,
      user_id: 1, link: "samples/Yeu Mot Nguoi Co Le - Lou Hoang Miu Le.mp3", country_id: 1
    Fabricate :song, name: "Va the la het", view: 10, song_type: 1, download: 1045054,
      user_id: 1, link: "samples/Va-The-La-Het-Soobin-Hoang-Son.mp3", country_id: 1
    Fabricate :song, name: "Con tim vo tan", view: 10, song_type: 1, download: 1045057,
      user_id: 1, link: "samples/Con-Tim-Tan-Vo-Phan-Manh-Quynh.mp3", country_id: 1
    Fabricate :song, name: "Co gai ngay hom qua", view: 10, song_type: 1, download: 2145057,
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

    puts "album music type"
    Fabricate :album_music_type, album_id: 1, music_type_id: 1
    Fabricate :album_music_type, album_id: 1, music_type_id: 3
    Fabricate :album_music_type, album_id: 2, music_type_id: 1
    Fabricate :album_music_type, album_id: 3, music_type_id: 2
    Fabricate :album_music_type, album_id: 4, music_type_id: 3
    Fabricate :album_music_type, album_id: 5, music_type_id: 4
    Fabricate :album_music_type, album_id: 6, music_type_id: 4
    Fabricate :album_music_type, album_id: 7, music_type_id: 1
    Fabricate :album_music_type, album_id: 8, music_type_id: 2
    Fabricate :album_music_type, album_id: 9, music_type_id: 3
    Fabricate :album_music_type, album_id: 10, music_type_id: 3

    puts "album song"
    10.times do |i|
      Fabricate :album_song, album_id: i + 1, song_id: i + 1
      Fabricate :album_song, album_id: 11, song_id: i + 1
      Fabricate :album_song, album_id: 12, song_id: i + 1
      Fabricate :album_song, album_id: 13, song_id: i + 1
    end

    puts "create rank"
    10.times do |i|
      Fabricate :rank, number: i + 1, view_start: 10, view_end: 20 + i, target_type: "song", target_id: i + 1, total_view: 10 +i
      Fabricate :rank, number: i + 1, view_start: 10, view_end: 20 + i, target_type: "album", target_id: i + 1, total_view: 10 +i
    end

    puts "create author song"
    10.times do |i|
        Fabricate :author_song, author_id: i + 1, song_id: i + 1
    end

    puts "create lyric"
    Fabricate :lyric,  user_id: 1, song_id: 2, content: "
        Em ơi mình đã yêu nhau được mấy tháng rồi?
        Em ơi mình đã qua bao nhiêu sóng gió trên đời?
        Có mấy đêm anh thức khuya đọc những lá thư em trao đến anh
        Em ơi mình đã xa nhau hơn cả tuần rồi!

        Đây là valentine đầu tiên, anh và em có nhau, yêu nhau
        Sao em không ở đây bên anh lúc này
        Đây cà phê nhớ em,
        Đây hàng me nhớ em,
        Đây Đông Du nhớ em bên anh mỗi khi tan ca
        Anh mong sao ngày chóng qua

        Em ơi một ngày em nói yêu anh bao nhiêu lần?
        Em ơi một tuần gặp nhau bao nhiêu là vừa?
        Có lúc ta hay giận hờn vu vơ
        Anh chẳng nói còn em lặng im
        Em ơi, mình đã hiểu nhau đến bao nhiêu rồi?
        Đây là valentine đầu tiên, anh và em có nhau, yêu nhau
        Sao em không ở đây bên anh ngay lúc này
        Đây Sài Gòn nhớ em
        Đây mình anh lái xe vòng vòng
        Đây hoàng hôn ghé thăm nơi góc phố riêng đôi ta
        Anh mong sao ngày chóng qua

        Em ơi dù mai sau có gió mưa xô nghiêng vào đầu
        Em ơi em nhớ nắm tay anh qua thương đau
        Em ơi lòng này yêu em
        Chỉ có hàng me mới hiểu lòng anh
        Em ơi hãy đừng hoài nghi vì trái tim anh ngu si
        Anh mong mình luôn có đôi
    "

    puts "Success remake data"
  end
end
