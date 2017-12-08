import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import sgApp from '../reducers'

import Container from './Container'

let store = createStore(sgApp)

class App extends React.Component {
	constructor (props) {
		super(props)

		for (let i in props) {
			store.dispatch({
				type: 'SET_' + i.toUpperCase(),
				payload: props[i]
			})
		}
	}

	componentDidCatch (error, info) {
		console.log(error, info)
	}

	render () {
		return (
			<Provider store={store}>
				<Container />
			</Provider>
		)
	}
}

export default App