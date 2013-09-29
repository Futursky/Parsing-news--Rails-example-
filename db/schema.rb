# encoding: UTF-8
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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130408190230) do

  create_table "admins", :force => true do |t|
    t.string   "name"
    t.string   "password"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "articles", :force => true do |t|
    t.string   "title"
    t.string   "image"
    t.text     "content"
    t.string   "url"
    t.integer  "feed_id"
    t.datetime "created_at",                            :null => false
    t.datetime "updated_at",                            :null => false
    t.date     "create_time", :default => '2013-04-22', :null => false
    t.string   "hash_code"
  end

  create_table "feeds", :force => true do |t|
    t.string   "name"
    t.string   "url"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "plugin_id"
  end

  create_table "plugins", :force => true do |t|
    t.string   "name"
    t.string   "file_name"
    t.string   "path"
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.integer  "file_size",  :default => 0
  end

end
