class Code < ApplicationRecord
  belongs_to :component
  belongs_to :user
end
