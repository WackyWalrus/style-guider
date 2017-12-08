import React from 'react'
import axios from 'axios'

class Register extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			password: '',
			confirmPassword: ''
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
		}).post('/users', this.state).then(function (response) {
			if (response.data.success === true) {
				_.props.changePage('user', [
					{
						type: 'SET_USER',
						payload: response.data.user
					}
				], '/users/' + response.data.user.id)
			}
		})
	}

	input_handleChange (e) {
		e.preventDefault()

		let name = e.target.attributes.name.value,
			value = e.target.value,
			s = {}

		s[name] = value

		this.setState(s)
	}

	detectSubmit (e) {
		if (e.key === 'Enter') {
			if (this.state.name !== '' &&
					this.state.email !== '' &&
					this.state.password !== '' &&
					this.state.confirmPassword !== '') {
				this.submit_clickHandler()
			}
		}
	}

	render () {
		return (
			<div className="register" onKeyUp={this.detectSubmit.bind(this)}>
				<div className="form-group">
					<label>Name:</label>
					<input type="name" className="form-control" name="name" value={this.state.name} onChange={this.input_handleChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Email:</label>
					<input type="email" className="form-control" name="email" value={this.state.email} onChange={this.input_handleChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input type="password" className="form-control" name="password" value={this.state.password} onChange={this.input_handleChange.bind(this)} />
				</div>
				<div className="form-group">
					<label>Confirm Password:</label>
					<input type="password" className="form-control" name="confirmPassword" value={this.state.confirmPassword} onChange={this.input_handleChange.bind(this)} />
				</div>

				<input type="submit" className="btn btn-primary" value="Sign Up" onClick={this.submit_clickHandler.bind(this)} />
			</div>
		)
	}
}

export default Register