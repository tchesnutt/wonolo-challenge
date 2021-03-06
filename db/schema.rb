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

ActiveRecord::Schema.define(version: 20170914173943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "badges", force: :cascade do |t|
    t.string "name"
    t.string "icon_url"
    t.integer "job_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.index ["job_id"], name: "index_badges_on_job_id"
  end

  create_table "badges_jobs", id: false, force: :cascade do |t|
    t.integer "job_id", null: false
    t.integer "badge_id", null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.integer "job_id"
    t.string "category"
    t.string "address"
    t.string "city"
    t.string "venue"
    t.text "description"
    t.float "w2_hourly_rate"
    t.float "wage"
    t.integer "duration"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
