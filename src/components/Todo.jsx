import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Todos.css'


library.add(faTimes)

export default class ToDo extends Component {

    render() {
        const todo = this.props.todo
        return (
            <div draggable="true" id={todo.id} onDragStart={this.props.drag} className="card_todo">
                <FontAwesomeIcon icon="times" className='close' onClick={() => this.props.delete(todo.id)}/>
                <div className="card_details">
                    <h4>{todo.title}</h4>
                    <p>{todo.description}</p>
                </div>
            </div>
        )
    }
}