const mapStateToProps = function(state){
	return {
		page: state.page,
		user: state.user,
		house: state.house,
		house_users: state.house_users,
		house_user_types: state.house_user_types,
		house_projects: state.house_projects,
		project: state.project,
		components: state.components
	}
}

export default mapStateToProps