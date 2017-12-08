class HousesController < ApplicationController
	include UsersHelper

	def show
		current_user

		@house = House.find(params[:id])

		respond_to do |format|
			format.html

			format.json {
				render json: @house
			}
		end
	end

	def new

	end

	def create
		current_user

		house = House.new
		house.name = params[:name]
		house.description = params[:description]
		house.save!

		house_user_type = HouseUserType.new
		house_user_type.house = house
		house_user_type.name = 'Admin'
		house_user_type.permissions = {
			'*': true
		}
		house_user_type.save!

		house_user = HouseUser.new
		house_user.user = @user
		house_user.house = house
		house_user.house_user_type = house_user_type
		house_user.save!

		respond_to do |format|
			format.html {
				render json: {
					success: true,
					page: 'houses#show',
					house: {
						id: house.id,
						name: house.name,
						description: house.description
					}
				}
			}
		end
	end

	def users
		current_user

		@house = House.find(params[:house_id])
		@house_users = @house.house_users.map {
			|house_user|
			user_js house_user.user
		}

		respond_to do |format|
			format.html

			format.json {
				render json: @house_users
			}
		end
	end

	def groups
		current_user

		@house = House.find(params[:house_id])
		@house_user_types = @house.house_user_types

		respond_to do |format|
			format.html

			format.json {
				render json: @house_user_types
			}
		end
	end

	def projects
		current_user

		@house = House.find(params[:house_id])
		@projects = @house.projects

		respond_to do |format|
			format.html

			format.json {
				render json: @projects
			}
		end
	end

	def new_project
		current_user

		@house = House.find(params[:house_id])
	end

	def create_project
		current_user

		house = House.find(params[:house_id])

		project = Project.new
		project.name = params[:name]
		project.description = params[:description]
		project.house = house
		project.save!

		if project
			respond_to do |format|
				format.html {
					render json: {
						success: true,
						project: project,
						house_projects: house.projects
					}
				}
			end
		end
	end

	def show_project
		current_user

		@house = House.find(params[:house_id])
		@project = Project.find(params[:id])

		respond_to do |format|
			format.html

			format.json {
				render json: @project
			}
		end
	end

	def new_component
		current_user

		@house = House.find(params[:house_id])
		@project = Project.find(params[:id])
	end

	def create_component
		current_user

		house = House.find(params[:house_id])
		project = Project.find(params[:id])

		component = Component.new
		component.house = house
		component.project = project
		component.user = @user
		component.title = params[:title]
		component.description = params[:description]
		component.save!

		if component
			respond_to do |format|
				format.html {
					render json: {
						success: true,
						component: component
					}
				}
			end
		end
	end

	def get_components
		current_user

		house = House.find(params[:house_id])
		project = Project.find(params[:id])

		respond_to do |format|
			format.html {
				render json: project.components
			}
			format.json {
				render json: project.components
			}
		end
	end

	def show_component
		current_user

		house = House.find(params[:house_id])
		project = Project.find(params[:id])
		component = Component.find(params[:component_id])

		@html = Code.order(created_at: :DESC).find_by(component_id: component.id, mode: 'htmlmixed')
		@css_link = "/houses/#{house.id}/projects/#{project.id}/components/#{component.id}/css.css"

		render layout: false
	end

	def show_css
		current_user

		house = House.find(params[:house_id])
		project = Project.find(params[:id])
		component = Component.find(params[:component_id])

		sass = Code.order(created_at: :DESC).find_by(component_id: component.id, mode: 'sass')

		if sass.nil? === false
			engine = Sass::Engine.new(sass.code, :syntax => :scss)
			@css = engine.render

			respond_to do |format|
				format.css {
					render text: @css, content_type: 'text/css'
				}
			end
		end
	end

	def save_code
		current_user

		house = House.find(params[:house_id])
		project = Project.find(params[:id])
		component = Component.find(params[:component_id])

		code = Code.new
		code.component = component
		code.user = @user
		code.code = params[:code]
		code.mode = params[:mode]
		code.save!

		if code
			respond_to do |format|
				format.html {
					render json: {
						success: true
					}
				}
			end
		end
	end
end
