class CreateProjects < ActiveRecord::Migration[5.1]
  def change
    create_table :projects do |t|
      t.references :house, foreign_key: true
      t.text :name
      t.text :description

      t.timestamps
    end
  end
end
