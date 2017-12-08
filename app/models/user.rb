class User < ApplicationRecord
	has_secure_password
	validates :name, :email, :password, presence: true, on: :create

	has_many :house_users
end
