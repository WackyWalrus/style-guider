class CreateHouseUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :house_users do |t|
      t.references :user, foreign_key: true
      t.references :house, foreign_key: true
      t.references :house_user_type, foreign_key: true

      t.timestamps
    end
  end
end
