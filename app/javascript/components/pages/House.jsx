import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

import mapStateToProps from '../state'

class NewHouse extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			name: '',
			description: ''
		}
	}

	input_changeHandler (e) {
		e.preventDefault()

		let value = e.target.value,
			name = e.target.attributes.name.value,
			s = {}

		s[name] = value

		this.setState(s)
	}

	form_handleSubmit (e) {
		e.preventDefault()

		let _ = this

		axios.create({
			headers: {
				'X-CSRF-Token': document.getElementsByName('csrf-token')[0].getAttribute('content')
			}
		}).post('/houses/', this.state).then(function (response) {
			if (response.data.success === true) {
				_.props.changePage('houses#show', [
					{
						type: 'SET_HOUSE',
						payload: response.data.house
					}
				], '/houses/' + response.data.house.id)
			}
		})
	}

	render () {
		return (
			<div>
				<h1>New House</h1>
				<div className="form">
					<div className="form-group">
						<label>House Name:</label>
						<input type="text" name="name" className="form-control" value={this.state.name} onChange={this.input_changeHandler.bind(this)} />
					</div>
					<div className="form-group">
						<label>Description:</label>
						<textarea className="form-control" name="description" value={this.state.description} onChange={this.input_changeHandler.bind(this)} />
					</div>
					<input type="submit" className="btn btn-primary" value="Create House" onClick={this.form_handleSubmit.bind(this)} />
				</div>
			</div>
		)
	}
}

class ShowHouse extends React.Component {
	constructor (props) {
		super(props)
	}

	render () {
		return (
			<div className="container">
				<h2>Latest Activity</h2>
			</div>
		)
	}
}

class HouseUsers extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			users: []
		}

		if (props.house_users === null) {
			this.getUsers()
		} else {
			this.state.users = props.house_users
		}
	}

	getUsers () {
		let _ = this
		axios.get('/houses/' + this.props.house.id + '/users.json').then(function (response) {
			_.setState({
				users: response.data
			})
			_.props.dispatch({
				type: 'SET_HOUSE_USERS',
				payload: response.data
			})
		})
	}

	render () {
		return (
			<div className="container">
				<h2>Users</h2>
				<ul>
					{this.state.users.map(function (user, index) {
						return (
							<li key={index}>{user.name}</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

class HouseUserTypes extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			types: []
		}

		if (props.house_user_types === null) {
			this.getTypes()
		} else {
			this.state.types = props.house_user_types
		}
	}

	getTypes () {
		let _ = this
		axios.get('/houses/' + this.props.house.id + '/groups.json').then(function (response) {
			_.setState({
				types: response.data
			})
			_.props.dispatch({
				type: 'SET_HOUSE_USER_TYPES',
				payload: response.data
			})
		})
	}

	render () {
		return (
			<div className="container">
				<h2>Groups</h2>
				<ul>
					{this.state.types.map(function (type, index) {
						return (
							<li key={index}>{type.name}</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

class HouseProjects extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			projects: []
		}

		if (props.house_projects === null) {
			this.getProjects()
		} else {
			this.state.projects = props.house_projects
		}
	}

	getProjects () {
		let _ = this
		axios.get('/houses/' + this.props.house.id + '/projects.json').then(function (response) {
			_.setState({
				projects: response.data
			})
			_.props.dispatch({
				type: 'SET_HOUSE_PROJECTS',
				payload: response.data
			})
		})
	}

	changePage (e) {
		e.preventDefault()
		let href = e.currentTarget.attributes['data-href'].value,
			location = e.currentTarget.attributes['data-location'].value,
			_ = this,
			dis = []

		if (href === 'houses#show_project') {
			axios.get(location + '.json').then(function (response) {
				dis.push({
					type: 'SET_PROJECT',
					payload: response.data
				})
				_.props.changePage(href, dis, location)
			})
		} else {
			this.props.changePage(href, dis, location)
		}

	}

	render () {
		let _ = this
		return (
			<div className="container">
				<h2>Projects <a href={"/house/" + this.props.house.id + "/projects/new"} onClick={this.changePage.bind(this)} data-href="houses#new_project" data-location={"/houses/" + this.props.house.id + "/projects/new"} className="btn btn-xs btn-primary"><span className="glyphicon glyphicon-plus"></span></a></h2>
				<ul>
					{this.state.projects.map(function (project, index) {
						return (
							<li key={index}><a href={"/houses/" + _.props.house.id + "/projects/" + project.id} onClick={_.changePage.bind(_)} data-href="houses#show_project" data-location={"/houses/" + _.props.house.id + "/projects/" + project.id}>{project.name}</a></li>
						)
					})}
				</ul>
			</div>
		)
	}
}

class NewProject extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			name: '',
			description: ''
		}
	}

	input_changeHandler (e) {
		e.preventDefault()

		let name = e.target.attributes.name.value,
			s = {}

		s[name] = e.target.value

		this.setState(s)
	}

	submit_clickHandler (e) {
		e.preventDefault()

		let _ = this

		axios.create({
			headers: {
				'X-CSRF-Token': document.getElementsByName('csrf-token')[0].getAttribute('content')
			}
		}).post('/houses/' + _.props.house.id + '/projects/new', _.state).then(function (response) {
			if (response.data.success === true) {
				_.props.changePage('houses#show_project', [
					{
						type: 'SET_PROJECT',
						payload: response.data.project
					},
					{
						type: 'SET_HOUSE_PROJECTS',
						payload: response.data.house_projects
					}
				], '/houses/' + _.props.house.id + '/projects/' + response.data.project.id)
			}
		})
	}

	render () {
		return (
			<div className="container">
				<h1>New Project</h1>
				<div className="form">
					<div className="form-group">
						<label>Name:</label>
						<input type="text" name="name" value={this.state.name} onChange={this.input_changeHandler.bind(this)} className="form-control" />
					</div>
					<div className="form-group">
						<label>Description:</label>
						<textarea name="description" value={this.state.description} onChange={this.input_changeHandler.bind(this)} className="form-control" />
					</div>

					<input type="submit" value="Create Project" className="btn btn-primary" onClick={this.submit_clickHandler.bind(this)} />
				</div>
			</div>
		)
	}
}

import Project from './Project'

class NewComponent extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			title: '',
			description: ''
		}
	}

	input_changeHandler (e) {
		e.preventDefault()

		let name = e.target.attributes.name.value,
			value = e.target.value,
			s = {}

		s[name] = value
		this.setState(s)
	}

	submit_clickHandler (e) {
		e.preventDefault()

		let _ = this

		axios.create({
			headers: {
				'X-CSRF-Token': document.getElementsByName('csrf-token')[0].getAttribute('content')
			}
		}).post('/houses/' + this.props.house.id + '/projects/' + this.props.project.id + '/component', this.state).then(function (response) {
			console.log(response)
			if (response.data.success === true) {
				_.props.changePage('houses#show_project', [{
					type: 'ADD_COMPONENT',
					payload: response.data.component
				}], '/houses/' + _.props.house.id + '/projects/' + _.props.project.id);
			}
		})
	}

	render () {

		let attributes = {
			onChange: this.input_changeHandler.bind(this),
			className: 'form-control'
		}

		return (
			<div className="container">
				<h2>New Component</h2>
				<div className="form">
					<div className="form-group">
						<label>Title:</label>
						<input type="text" name="title" value={this.state.title} { ...attributes } />
					</div>
					<div className="form-group">
						<label>Description:</label>
						<textarea name="description" value={this.state.description} { ...attributes } />
					</div>

					<input type="submit" value="Create Component" className="btn btn-primary" onClick={this.submit_clickHandler.bind(this)} />
				</div>
			</div>
		)
	}
}

class House extends React.Component {
	render () {
		let _ = this

		if (this.props.user.allowed_houses.indexOf(this.props.house.id) === -1) {
			this.props.changePage('homepage', [{
				type: 'SET_HOUSE',
				payload: null
			}], '/')
		}

		let attributes = {
			changePage: _.props.changePage.bind(_),
			dispatch: _.props.dispatch.bind(_)
		}

		const Page = () => {
			switch (this.props.page) {
				case 'houses#new':
					return <NewHouse { ...attributes } />
					break;
				case 'houses#show':
					return <ShowHouse { ...attributes } house={_.props.house} />
					break;
				case 'houses#users':
					return <HouseUsers { ...attributes } house={_.props.house} house_users={_.props.house_users} />
					break;
				case 'houses#groups':
					return <HouseUserTypes { ...attributes } house={_.props.house} house_user_types={_.props.house_user_types} />
					break;
				case 'houses#projects':
					return <HouseProjects { ...attributes } house={_.props.house} house_projects={_.props.house_projects} />
					break;
				case 'houses#new_project':
					return <NewProject { ...attributes } house={_.props.house} />
					break;
				case 'houses#show_project':
					return <Project { ...attributes } />
					break;
				case 'houses#new_component':
					return <NewComponent { ...attributes } house={_.props.house} project={_.props.project} />
					break;
			}
		}

		return (
			<div className="container">
				<Page page={this.props.page} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(House)

