import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

import mapStateToProps from '../state'

class User extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			houses: this.props.user.allowed_houses.map((house) => {
				return {}
			})
		}

		let _ = this

		let ops = []

		for (let i = 0; i < this.state.houses.length; i += 1) {
			ops.push(axios.get('/houses/' + _.props.user.allowed_houses[i] + '.json'))
		}

		axios.all(ops).then(axios.spread(function () {
			let arr = []
			Object.keys(arguments).map((key, index) => {
				arr.push(arguments[key].data)
			})

			_.setState({
				houses: arr
			})
		}))
	}

	newHouseButton_clickHandler (e) {
		e.preventDefault()
		this.props.changePage('houses#new', [], '/houses/new')
	}

	changePage (e) {
		e.preventDefault()

		let href = e.target.attributes['data-href'].value,
			url = e.target.attributes['data-url'].value,
			index = e.target.attributes['data-index'].value,
			_ = this

		this.props.changePage('houses#show', [{
			type: 'SET_HOUSE',
			payload: _.state.houses[index]
		}], '/houses/' + _.state.houses[index].id)
	}

	render () {
		return (
			<div className="container">
				<h1>Houses <button className="btn btn-xs btn-primary" onClick={this.newHouseButton_clickHandler.bind(this)}><span className="glyphicon glyphicon-plus"></span></button></h1>
				<ul>
					{this.state.houses.map((house, index) => {
						if (house === {}) {
							return (
								<li className="loading" key={index}></li>
							)
						}
						return (
							<li key={index}><a href="#" onClick={this.changePage.bind(this)} data-href="houses#show" data-url={"/houses/" + house.id + "/"} data-index={index}>{house.name}</a></li>
						)
					})}
				</ul>
			</div>
		)
	}
}

export default connect(mapStateToProps)(User)