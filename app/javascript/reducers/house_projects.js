const house_projects = (state = null, action) => {
	switch (action.type) {
		case 'SET_HOUSE_PROJECTS':
			return action.payload
		default:
			return state
	}
}

export default house_projects