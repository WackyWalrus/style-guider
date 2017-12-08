class Project < ApplicationRecord
  belongs_to :house
  has_many :components
end
