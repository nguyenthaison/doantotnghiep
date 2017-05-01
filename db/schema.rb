# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170501104212) do

  create_table "album_music_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "album_id"
    t.integer  "music_type_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["album_id"], name: "index_album_music_types_on_album_id", using: :btree
    t.index ["music_type_id"], name: "index_album_music_types_on_music_type_id", using: :btree
  end

  create_table "album_singers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "album_id"
    t.integer  "singer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_album_singers_on_album_id", using: :btree
    t.index ["singer_id"], name: "index_album_singers_on_singer_id", using: :btree
  end

  create_table "album_songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "album_id"
    t.integer  "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_album_songs_on_album_id", using: :btree
    t.index ["song_id"], name: "index_album_songs_on_song_id", using: :btree
  end

  create_table "albums", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "view"
    t.integer  "share"
    t.string   "name"
    t.integer  "creator"
    t.integer  "country_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "attachments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "attachmentable_type"
    t.integer  "attachmentable_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "attachment_file_name"
    t.string   "attachment_content_type"
    t.integer  "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.index ["attachmentable_type", "attachmentable_id"], name: "index_attachments_on_attachmentable_type_and_attachmentable_id", using: :btree
  end

  create_table "author_songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "song_id"
    t.integer  "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_author_songs_on_author_id", using: :btree
    t.index ["song_id"], name: "index_author_songs_on_song_id", using: :btree
  end

  create_table "authors", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "age"
    t.date     "dob"
    t.text     "content",        limit: 65535
    t.integer  "total_favorite"
    t.integer  "countries_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["countries_id"], name: "index_authors_on_countries_id", using: :btree
  end

  create_table "avatars", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "avatar"
    t.integer  "user_id"
    t.integer  "singer_id"
    t.integer  "album_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["album_id"], name: "index_avatars_on_album_id", using: :btree
    t.index ["singer_id"], name: "index_avatars_on_singer_id", using: :btree
  end

  create_table "claims", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "title"
    t.text     "content",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "comments", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "like"
    t.integer  "unlike"
    t.text     "content",       limit: 65535
    t.integer  "user_id"
    t.integer  "attachment_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["attachment_id"], name: "index_comments_on_attachment_id", using: :btree
  end

  create_table "countries", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "short_name"
    t.string   "full_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "country_music_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "music_type_id"
    t.integer  "country_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["country_id"], name: "index_country_music_types_on_country_id", using: :btree
    t.index ["music_type_id"], name: "index_country_music_types_on_music_type_id", using: :btree
  end

  create_table "favorite_articles", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.string   "article_type"
    t.integer  "article_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["article_type", "article_id"], name: "index_favorite_articles_on_article_type_and_article_id", using: :btree
    t.index ["user_id"], name: "index_favorite_articles_on_user_id", using: :btree
  end

  create_table "favorite_musics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["song_id"], name: "index_favorite_musics_on_song_id", using: :btree
    t.index ["user_id"], name: "index_favorite_musics_on_user_id", using: :btree
  end

  create_table "favorites", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "favorite"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "artist_type"
    t.integer  "artist_id"
    t.index ["artist_type", "artist_id"], name: "index_favorites_on_artist_type_and_artist_id", using: :btree
  end

  create_table "hotkey_words", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "content",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "lyrics", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.text     "content",       limit: 65535
    t.integer  "user_id"
    t.integer  "attachment_id"
    t.integer  "song_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["attachment_id"], name: "index_lyrics_on_attachment_id", using: :btree
    t.index ["song_id"], name: "index_lyrics_on_song_id", using: :btree
  end

  create_table "music_type_play_lists", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "music_type_id"
    t.integer  "play_list_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["music_type_id"], name: "index_music_type_play_lists_on_music_type_id", using: :btree
    t.index ["play_list_id"], name: "index_music_type_play_lists_on_play_list_id", using: :btree
  end

  create_table "music_type_songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "music_type_id"
    t.integer  "song_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["music_type_id"], name: "index_music_type_songs_on_music_type_id", using: :btree
    t.index ["song_id"], name: "index_music_type_songs_on_song_id", using: :btree
  end

  create_table "music_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "play_list_songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "play_list_id"
    t.integer  "song_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["play_list_id"], name: "index_play_list_songs_on_play_list_id", using: :btree
    t.index ["song_id"], name: "index_play_list_songs_on_song_id", using: :btree
  end

  create_table "play_lists", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "view"
    t.text     "describe",   limit: 65535
    t.integer  "user_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["user_id"], name: "index_play_lists_on_user_id", using: :btree
  end

  create_table "ranks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "number"
    t.datetime "start_date"
    t.datetime "end_date"
    t.string   "view_start"
    t.string   "view_end"
    t.integer  "total_view"
    t.string   "target_type"
    t.integer  "target_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["target_type", "target_id"], name: "index_ranks_on_target_type_and_target_id", using: :btree
  end

  create_table "relationships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "user_id"
    t.integer  "singer_id"
    t.text     "notes",      limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["singer_id"], name: "index_relationships_on_singer_id", using: :btree
  end

  create_table "singer_songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "song_id"
    t.integer  "singer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["singer_id"], name: "index_singer_songs_on_singer_id", using: :btree
    t.index ["song_id"], name: "index_singer_songs_on_song_id", using: :btree
  end

  create_table "singers", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "age"
    t.date     "dob"
    t.text     "content",        limit: 65535
    t.integer  "total_favorite"
    t.integer  "countries_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.index ["countries_id"], name: "index_singers_on_countries_id", using: :btree
  end

  create_table "song_ranks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "song_id"
    t.integer  "rank_id"
    t.integer  "rank"
    t.string   "view_start"
    t.string   "view_end"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rank_id"], name: "index_song_ranks_on_rank_id", using: :btree
    t.index ["song_id"], name: "index_song_ranks_on_song_id", using: :btree
  end

  create_table "songs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "view"
    t.integer  "song_type"
    t.integer  "rank"
    t.integer  "download"
    t.string   "link"
    t.integer  "user_id"
    t.integer  "country_id"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "attachment_file_name"
    t.string   "attachment_content_type"
    t.integer  "attachment_file_size"
    t.datetime "attachment_updated_at"
    t.index ["country_id"], name: "index_songs_on_country_id", using: :btree
  end

  create_table "tags", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.text     "content",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "login_id"
    t.string   "name"
    t.integer  "role"
    t.string   "phone_number"
    t.date     "dob"
    t.integer  "country_id"
    t.index ["country_id"], name: "index_users_on_country_id", using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "videos", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.integer  "view"
    t.integer  "video_type"
    t.integer  "rank"
    t.integer  "download"
    t.integer  "album_id"
    t.integer  "music_type_id"
    t.integer  "user_id"
    t.integer  "singer_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["album_id"], name: "index_videos_on_album_id", using: :btree
    t.index ["music_type_id"], name: "index_videos_on_music_type_id", using: :btree
    t.index ["singer_id"], name: "index_videos_on_singer_id", using: :btree
  end

end
