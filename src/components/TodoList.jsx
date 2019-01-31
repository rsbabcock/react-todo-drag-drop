import React, { Component } from 'react'
import { getTodos } from '../api/api'

export default class ToDoList extends Component {
    state = {
        todos: []
    }
    componentDidMount() {
        getTodos().then(todos => this.setState({ todos: todos }))
    }

    render() {
        return (
            <div>
                <h1>Todos</h1>
                <div>
                    {this.state.todos.map(todo => (<div>{todo.title}</div>))}
                </div>
            </div>
        )
    }
}