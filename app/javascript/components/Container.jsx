import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import mapStateToProps from './state'

import Navbar from './Navbar'
import Homepage from './pages/Homepage'
import User from './pages/User'
import House from './pages/House'

class Container extends React.Component {
	changePage (arg, dis = [], url = null) {
		if (dis.length > 0) {
			for (let i = 0; i < dis.length; i += 1) {
				this.props.dispatch(dis[i])
			}
		}

		this.props.dispatch({
			type: 'SET_PAGE',
			payload: arg
		})

		if (url !== null) {
			history.pushState(null, null, url)
		} else {
			history.pushState(null, null, arg)
		}
	}

	render () {
		let _ = this

		let Page = (props) => {
			if (props.page === 'homepage' && _.props.user !== null) {
				_.props.dispatch({
					type: 'SET_PAGE',
					payload: 'user'
				})
			}

			switch (props.page) {
				case 'homepage':
					return <Homepage changePage={_.changePage.bind(_)} />
					break;
				case 'user':
					return <User changePage={_.changePage.bind(_)} />
					break;
				case 'houses#new':
				case 'houses#show':
				case 'houses#users':
				case 'houses#groups':
				case 'houses#projects':
				case 'houses#new_project':
				case 'houses#show_project':
				case 'houses#new_component':
					return <House changePage={_.changePage.bind(_)} />
					break;
				default:
					return <p>404</p>
					break;
			}
		}

		return (
			<div>
				<Navbar changePage={this.changePage.bind(this)} user={this.props.user} page={this.props.page} />
				<Page page={this.props.page} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(Container)