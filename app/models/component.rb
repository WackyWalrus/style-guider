class Component < ApplicationRecord
  belongs_to :house
  belongs_to :project
  belongs_to :user
  after_initialize :set_code

  attribute :html, :string, default: ''
  attribute :sass, :string, default: ''

  private
	  def set_code
	  	html = Code.order(created_at: :DESC).find_by(component_id: self.id, mode: 'htmlmixed')
	  	if html.nil? === false
		  	puts html.code
	  		self.html = html.code
	  	end

	  	sass = Code.order(created_at: :DESC).find_by(component_id: self.id, mode: 'sass')
	  	if sass.nil? === false
		  	self.sass = sass.code
		  end
		end
end
