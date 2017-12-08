class HouseUser < ApplicationRecord
  belongs_to :user
  belongs_to :house
  belongs_to :house_user_type
end
