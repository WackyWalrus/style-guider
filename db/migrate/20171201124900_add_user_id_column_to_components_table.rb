class AddUserIdColumnToComponentsTable < ActiveRecord::Migration[5.1]
  def change
  	add_reference :components, :user, index: true
  end
end
