class PagesController < ApplicationController
	include UsersHelper

	def index
		current_user
	end
end
