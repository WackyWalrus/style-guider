class CreateComponents < ActiveRecord::Migration[5.1]
  def change
    create_table :components do |t|
      t.references :house, foreign_key: true
      t.references :project, foreign_key: true
      t.text :title
      t.text :description

      t.timestamps
    end
  end
end
