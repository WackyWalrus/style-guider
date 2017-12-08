const house_user_types = (state = null, action) => {
	switch (action.type) {
		case 'SET_HOUSE_USER_TYPES':
			return action.payload
		default:
			return state
	}
}

export default house_user_types