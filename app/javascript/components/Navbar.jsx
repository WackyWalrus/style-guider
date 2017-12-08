import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import { createStore } from 'redux'
import sgApp from '../reducers'
let store = createStore(sgApp)

class Navbar extends React.Component {
	constructor (props) {
		super(props)
	}

	changePage (e) {
		e.preventDefault()
		let href = e.target.attributes['data-href'].value
		let data = []

		if (href === 'homepage') {
			data = [{
				type: 'SET_HOUSE',
				payload: null
			}]
		}

		data.push({
			type: 'SET_PROJECT',
			payload: null
		})

		data.push({
			type: 'SET_COMPONENTS',
			payload: null
		})

		this.props.changePage(href, data, e.target.attributes['data-location'].value)
	}

	render () {
		let _ = this

		const NavbarHeader = () => {
			if (this.props.house !== null) {
				return (
					<div className="navbar-header">
						<a href="#" className="navbar-brand" onClick={this.changePage.bind(this)} data-href="homepage" data-location="/">Style Guider</a>
						<a href={"/houses/" + _.props.house.id} onClick={this.changePage.bind(this)} data-href="houses#show" data-location={"/houses/" + _.props.house.id}>[{this.props.house.name}]</a>
					</div>
				)
			}

			return (
				<div className="navbar-header">
					<a href="#" className="navbar-brand" onClick={this.changePage.bind(this)} data-href="homepage" data-location="/">Style Guider</a>
				</div>
			)
		}

		const NavbarNav = () => {
			if (this.props.house !== null) {
				return (
					<ul className="nav navbar-nav">
						<li><a href="#" onClick={this.changePage.bind(this)} data-href="houses#users" data-location={"/houses/" + this.props.house.id + "/users"}>Users</a></li>
						<li><a href="#" onClick={this.changePage.bind(this)} data-href="houses#groups" data-location={"/houses/" + this.props.house.id + "/groups"}>User Groups</a></li>
						<li><a href="#" onClick={this.changePage.bind(this)} data-href="houses#projects" data-location={"/houses/" + this.props.house.id + "/projects"}>Projects</a></li>
						<li><a href="#" onClick={this.changePage.bind(this)} data-href="houses#settings" data-location={"/houses/" + this.props.house.id + "/settings"}>Settings</a></li>
					</ul>
				)
			}

			return (
				<ul className="nav navbar-nav"></ul>
			)
		}

		const NavbarRight = () => {
			if (this.props.user !== null) {
				return (
					<ul className="nav navbar-nav navbar-right">
						<li><a href="#">Logout</a></li>
					</ul>
				)
			}

			return (
				<ul className="nav navbar-nav navbar-right"></ul>
			)
		}

		return (
			<div className="navbar navbar-default">
				<div className="container-fluid">
					<NavbarHeader />
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
						<NavbarNav />
						<NavbarRight />
				    </div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function(state){
	return {
		page: state.page,
		user: state.user,
		house: state.house
	}
}

export default connect(mapStateToProps)(Navbar)