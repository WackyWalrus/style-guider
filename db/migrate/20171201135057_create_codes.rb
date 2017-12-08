class CreateCodes < ActiveRecord::Migration[5.1]
  def change
    create_table :codes do |t|
      t.references :component, foreign_key: true
      t.references :user, foreign_key: true
      t.text :code
      t.text :filetype

      t.timestamps
    end
  end
end
