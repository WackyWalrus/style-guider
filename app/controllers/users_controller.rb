class UsersController < ApplicationController
	include UsersHelper

	def show
		@user = User.find(params[:id])

		respond_to do |format|
			format.html
			format.json {
				render json: {
					id: @user.id,
					name: @user.name,
					email: @user.email
				}
			}
		end

		if session[:current_user] != @user.id
			redirect_to '/'
		end
	end

	def create
		user = User.new

		user.name = params[:name]
		user.email = params[:email]
		user.password = params[:password]
		user.password_confirmation = params[:confirmPassword]

		user.save!

		session[:current_user] = user.id

		if session[:current_user]
			respond_to do |format|
				format.html {
					render json: {
						success: true,
						user: current_user_js
					}
				}
			end
		end
	end

	def login
		# get the user by email
		user = User.find_by(email: params[:email])
		# if there is a user with this email...
		if user
			# check if the password is correct
			if user.authenticate(params[:password])
				# setup the session
				session[:current_user] = user.id
				
				respond_to do |format|
					format.html {
						render json: {
							success: true,
							user: current_user_js
						}
					}
				end
			else
				respond_to do |format|
					format.html {
						render json: {
							success: false
						}
					}
				end
			end
		else
			respond_to do |format|
				format.html {
					render json: {
						success: false
					}
				}
			end
		end
	end
end
