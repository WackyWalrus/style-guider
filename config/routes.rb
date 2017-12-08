Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'pages#index'

  resources :users
  resources :houses do
  	get '/users/', controller: 'houses', action: 'users'
  	get '/groups/', controller: 'houses', action: 'groups'
  	get '/projects/', controller: 'houses', action: 'projects'
  	get '/projects/new/', controller: 'houses', action: 'new_project'
    post '/projects/new/', controller: 'houses', action: 'create_project'
    get '/projects/:id', controller: 'houses', action: 'show_project'
    get '/projects/:id/component', controller: 'houses', action: 'new_component'
    post '/projects/:id/component', controller: 'houses', action: 'create_component'
    get '/projects/:id/components', controller: 'houses', action: 'get_components'
    post '/projects/:id/components/:component_id/code', controller: 'houses', action: 'save_code'
    get '/projects/:id/components/:component_id', controller: 'houses', action: 'show_component'
    get '/projects/:id/components/:component_id/css', controller: 'houses', action: 'show_css'
  end

  post '/login', controller: 'users', action: 'login'
end
