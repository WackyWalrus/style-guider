const components = (state = null, action) => {
	switch (action.type) {
		case 'SET_COMPONENTS':
			return action.payload
		case 'ADD_COMPONENT':
			let arr
			if (state === null) {
				arr = []
			} else {
				arr = state
			}
			arr.push(action.payload)
			return arr
		default:
			return state
	}
}

export default components