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

ActiveRecord::Schema.define(version: 20171205141801) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "codes", force: :cascade do |t|
    t.bigint "component_id"
    t.bigint "user_id"
    t.text "code"
    t.text "mode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["component_id"], name: "index_codes_on_component_id"
    t.index ["user_id"], name: "index_codes_on_user_id"
  end

  create_table "components", force: :cascade do |t|
    t.bigint "house_id"
    t.bigint "project_id"
    t.text "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["house_id"], name: "index_components_on_house_id"
    t.index ["project_id"], name: "index_components_on_project_id"
    t.index ["user_id"], name: "index_components_on_user_id"
  end

  create_table "house_user_types", force: :cascade do |t|
    t.bigint "house_id"
    t.text "name"
    t.jsonb "permissions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["house_id"], name: "index_house_user_types_on_house_id"
  end

  create_table "house_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "house_id"
    t.bigint "house_user_type_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["house_id"], name: "index_house_users_on_house_id"
    t.index ["house_user_type_id"], name: "index_house_users_on_house_user_type_id"
    t.index ["user_id"], name: "index_house_users_on_user_id"
  end

  create_table "houses", force: :cascade do |t|
    t.text "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.bigint "house_id"
    t.text "name"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["house_id"], name: "index_projects_on_house_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "name"
    t.text "email"
    t.text "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "codes", "components"
  add_foreign_key "codes", "users"
  add_foreign_key "components", "houses"
  add_foreign_key "components", "projects"
  add_foreign_key "house_user_types", "houses"
  add_foreign_key "house_users", "house_user_types"
  add_foreign_key "house_users", "houses"
  add_foreign_key "house_users", "users"
  add_foreign_key "projects", "houses"
end
