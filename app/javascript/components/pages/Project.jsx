import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import ErrorBoundary from '../ErrorBoundary'

import mapStateToProps from '../state'

import Component from '../Component'

class Project extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			components: [],
			loading: true
		}

		if (this.props.components && this.props.components !== null) {
			this.state = {
				components: this.props.components,
				loading: false
			}
		} else {
			this.getComponents()
		}
	}

	getComponents () {
		let _ = this
		axios.get('/houses/' + _.props.house.id + '/projects/' + _.props.project.id + '/components.json').then(function (response) {
			_.setState({
				components: response.data,
				loading: false
			})
			_.props.dispatch({
				type: 'SET_COMPONENTS',
				payload: response.data
			})
		})
	}

	changePage (e) {
		e.preventDefault()

		let href = e.currentTarget.attributes['data-href'].value,
			location = e.currentTarget.attributes['data-location'].value

		this.props.changePage(href, [], location)
	}

	render () {
		return (
			<div className="container">
				<h2>
					{this.props.project.name}
					<a href={"/houses/" + this.props.house.id + "/projects/" + this.props.project.id + "/component"} onClick={this.changePage.bind(this)} data-href="houses#new_component" data-location={"/houses/" + this.props.house.id + "/projects/" + this.props.project.id + "/component"} className="btn btn-xs btn-primary" style={{marginLeft: '10px'}}>Add Component <span className="glyphicon glyphicon-plus"></span></a>
				</h2>
				<div className={"components " + ((this.state.loading) ? 'loading' : '')}>
					{this.state.components.map((component, index) => {
						return (
							<ErrorBoundary key={index}>
								<Component index={index} title={component.title} description={component.description} id={component.id} />
							</ErrorBoundary>
						)
					})}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps)(Project)