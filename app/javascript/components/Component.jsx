import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

import { Controlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/htmlmixed/htmlmixed')
require('codemirror/mode/sass/sass')

import mapStateToProps from './state'

let timeout = null

class Component extends React.Component {
	constructor (props) {
		super(props)

		let htmlmixed = '',
			sass = ''

		if (this.props.components !== null) {
			htmlmixed = this.props.components[this.props.index].html
			sass = this.props.components[this.props.index].sass
		}

		this.state = {
			mode: 'htmlmixed',
			values: {
				htmlmixed: htmlmixed,
				sass: sass
			}
		}
	}

	codemirror_beforeChangeHandler (editor, data, value) {
		let s = {
			values: {}
		}
		s.values[this.state.mode] = value
		this.setState(s)
	}

	codemirror_changeHandler (editor, data, value) {
		let _ = this

		let save = () => {
			axios.create({
				headers: {
					'X-CSRF-TOKEN': document.getElementsByName('csrf-token')[0].getAttribute('content')
				}
			}).post('/houses/' + _.props.house.id + '/projects/' + _.props.project.id + '/components/' + _.props.id + '/code', {
				mode: _.state.mode,
				code: value
			}).then((response) => {
				if (response.data.success === true) {
					this.refs.iframe.src = this.refs.iframe.src
				}
			})
		}

		clearTimeout(timeout)
		timeout = setTimeout(save, 500)
	}

	changeMode (e) {
		e.preventDefault()

		let mode = e.target.attributes['data-mode'].value

		this.setState({
			mode: mode
		})
	}

	render () {
		return (
			<div>
				<h3>{this.props.title}</h3>
				<p>{this.props.description}</p>

				<iframe ref="iframe" src={"/houses/" + this.props.house.id + "/projects/" + this.props.project.id + "/components/" + this.props.id + "/"} />

				<ul className="filetypes">
					<li><a href="#" onClick={this.changeMode.bind(this)} data-mode="htmlmixed">html</a></li>
					<li><a href="#" onClick={this.changeMode.bind(this)} data-mode="sass">sass</a></li>
				</ul>
				<CodeMirror
					value={this.state.values[this.state.mode]}
					options={{
						mode: this.state.mode,
						theme: 'material',
						lineNumbers: true
					}}
					onBeforeChange={this.codemirror_beforeChangeHandler.bind(this)}
					onChange={this.codemirror_changeHandler.bind(this)}
				/>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Component)

