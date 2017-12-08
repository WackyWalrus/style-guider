class House < ApplicationRecord
	has_many :house_users
	has_many :house_user_types
	has_many :projects
end
