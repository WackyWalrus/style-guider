class CreateHouseUserTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :house_user_types do |t|
      t.references :house, foreign_key: true
      t.text :name
      t.jsonb :permissions

      t.timestamps
    end
  end
end
