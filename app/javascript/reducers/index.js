import { combineReducers } from 'redux'

import page from './page'
import user from './user'
import house from './house'
import house_users from './house_users'
import house_user_types from './house_user_types'
import house_projects from './house_projects'
import project from './project'
import components from './components'

const sgApp = combineReducers({
	page,
	user,
	house,
	house_users,
	house_user_types,
	house_projects,
	project,
	components
})

export default sgApp