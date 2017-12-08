module UsersHelper
	def current_user
		if session[:current_user]
			@user = User.find(session[:current_user])
		end
	end

	def user_js (user)
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			allowed_houses: user.house_users.map { |x| x.house_id }
		}
	end

	def current_user_js
		current_user
		if @user
			return user_js @user
		end
	end
end
