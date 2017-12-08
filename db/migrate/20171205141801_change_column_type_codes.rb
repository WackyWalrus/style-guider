class ChangeColumnTypeCodes < ActiveRecord::Migration[5.1]
  def change
  	rename_column :codes, :filetype, :mode
  end
end
