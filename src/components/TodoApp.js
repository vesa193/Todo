import React, { Component } from 'react';
import close from '../../src/trash.png';
import calendar from '../../src/calendar.png';
import edit from '../../src/edit.png';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditActive: false,
			values: {}
		}
	}

	parseItems = (items = []) => {
		let ret = {}
		items.forEach(item => {
			if (item.isEditing) {
				ret[item.id] = item.text

			}
		})
		return ret;
	}

	/* componentWillUpdate() {
			this.setState({
					values: this.parseItems(this.props.items) 
			})
	}
 

	componentWillMount() {
			this.setState({
					values: this.parseItems(this.props.items) 
			})
	} */


	handleChange = (item, e) => {
		const { value } = e.target
		let newState = { ...this.state.values }
		let valueOfItem = item.text = value
		newState[item.id] = valueOfItem.trim()
		this.setState({
			values: newState
		})
	}

	render() {
		const { checked } = this.props
		const style = { backround: checked ? '' : 'yellow' }
		return (
			<ul className="TodoApp">
				{
					this.props.items.map((item, id) => {
						return (
							<li /* onClick={this.props.complete.bind(this, item.id)} */ style={style} className="list" key={item.id}>

								{!item.isEditing ? item.text :
									(<div className="edit-wrap">
										<input type="text" onChange={this.handleChange.bind(this, item)} value={item.text} />
										<button
											className="edit-button"
											disabled={item.text.length < 5 ? true : false}
											onClick={this.props.editItem.bind(this, {
												...item,
												text: this.state.values[item.id],
												isEditing: false
											})}
										>
											Submit
										</button>
									</div>
									)}
								<div className="checkbox checkbox-success">
									<input className="styled" type="checkbox" /* onChange={this.props.complete(item.id)} */ />
								</div>

								<img
									className="close"
									onClick={this.props.delete.bind(this, item)}
									src={close} alt="close" />

								<div className="box-of-icons">
									<span className="date"><img src={calendar} alt="calendar" />{item.date}</span>
									<img
										className="edit"
										onClick={this.props.edit.bind(this, item.id)}
										src={edit} alt="edit" />
								</div>
							</li>
						)
					})
				}
			</ul>
		);
	}
}

export default TodoApp;