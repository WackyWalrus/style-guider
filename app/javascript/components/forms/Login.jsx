import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import mapStateToProps from '../state'

class Login extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			email: '',
			password: '',
			notice: {}
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

	detectSubmit (e) {
		if (e.key === 'Enter') {
			if (this.state.email !== '' &&
					this.state.password !== '') {
				this.submit_clickHandler()
			}
		}
	}

	submit_clickHandler (e) {
		if (e !== undefined) {
			e.preventDefault()
		}

		let _ = this

		axios.create({
			headers: {
				'X-CSRF-Token': document.getElementsByName('csrf-token')[0].getAttribute('content')
			}
		}).post('/login', this.state).then(function (response) {
			if (!response.data.success) {
				_.setState({
					notice: {
						type: 'alert-danger',
						msg: 'There was an issue with your credentials.'
					}
				})
			} else {
				_.setState({
					type: 'alert-success',
					msg: 'Logged in! Redirecting you now.'
				})
				_.props.changePage('user', [
					{
						type: 'SET_USER',
						payload: response.data.user
					}
				], '/users/' + response.data.user.id)
			}
		})
	}

	render () {
		let Notice = (props) => {
			if (props.notice.type !== undefined) {
				return <div className={"notice alert " + props.notice.type}>
					{props.notice.msg}
				</div>
			}
			return <div className="notice"></div>
		}

		return (
			<div className="form" onKeyUp={this.detectSubmit.bind(this)}>
				<Notice notice={this.state.notice} />
				<div className="form-group">
					<label>Email:</label>
					<input type="email" name="email" value={this.state.email} onChange={this.input_changeHandler.bind(this)} className="form-control" />
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input type="password" name="password" value={this.state.password} onChange={this.input_changeHandler.bind(this)} className="form-control" />
				</div>

				<input type="submit" className="btn btn-primary" value="Login" onClick={this.submit_clickHandler.bind(this)} />
			</div>
		)
	}
}

export default connect(mapStateToProps)(Login)