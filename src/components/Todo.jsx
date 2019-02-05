import React, { Component } from 'react'
import './Todos.css'


export default class ToDo extends Component {

    render() {
        const todo = this.props.todo
        return (
            <div draggable="true" id={todo.id} onDragStart={this.props.drag}className="card_todo">
                <input type="radio" value={false} />
                <div className="card_details">
                    <h4>{todo.title}</h4>
                    <p>{todo.description}</p>
                </div>
            </div>
        )
    }
}