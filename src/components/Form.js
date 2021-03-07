import React, { Component } from 'react'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="Form-todo">
                <form className="Form" onSubmit={this.props.submit}>
                    <input type="text" placeholder="What's next up ...?" value={this.props.value} onChange={this.props.change} />
                    <button onClick={this.props.display} className="Form-btn" type="submit">Save</button>
                </form>
            </div>
        );
    }
}

export default Form;
