const house = (state = null, action) => {
	switch (action.type) {
		case 'SET_HOUSE':
			return action.payload
		default:
			return state
	}
}

export default house