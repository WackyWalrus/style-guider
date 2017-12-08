import React from 'react'
import { connect } from 'react-redux';

import mapStateToProps from '../state'

import Register from '../forms/Register'
import Login from '../forms/Login'

class Homepage extends React.Component {
	render () {
		return (
			<div className="container">
				<h1>Sign Up</h1>
				<Register changePage={this.props.changePage.bind(this)} />
				<h1>Log In</h1>
				<Login changePage={this.props.changePage.bind(this)} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(Homepage)