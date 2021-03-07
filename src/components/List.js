import React from 'react'

import close from '../../src/close-icon.png';
//import FlipMove from "react-flip-move"

console.log({ close })

const List = props => {
    return (
        <div>
            {props.items.map(item => {
                return (
                    <li style={item.style} className="list" key={item.id}>{item.text}

                        <input
                            onChange={this.props.checked}
                            defaultChecked={this.props.completed}
                            ref="completed"
                            className="checkbox"
                            type="checkbox" />

                        <img
                            className="close"
                            onClick={this.props.delete.bind(this, item)}
                            src={close} alt="" />
                    </li>
                )
            })}
        </div>
    )
}

export default List;