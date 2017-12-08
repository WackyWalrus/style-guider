const project = (state = null, action) => {
	switch (action.type) {
		case 'SET_PROJECT':
			return action.payload
		default:
			return state
	}
}

export default project