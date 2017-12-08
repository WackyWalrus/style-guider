const house_users = (state = null, action) => {
	switch (action.type) {
		case 'SET_HOUSE_USERS':
			return action.payload
		default:
			return state
	}
}

export default house_users