import React, { Component } from 'react'
import { getTodos, getTodo, editTodo } from '../api/api'
import Todo from './Todo'
import './Todos.css'

export default class ToDoList extends Component {
    state = {
        todo: [],
        doing: [],
        done: [],
        currentTodo: {}
    }
    componentDidMount() {
        getTodos().then(todos => {
            const todoArray = []
            const doingArray = []
            const doneArray = []
            todos.map(todo => {
                switch (todo.progress) {
                    case 'todo':
                        return todoArray.push(todo)
                    case 'doing':
                        return doingArray.push(todo)
                    case 'done':
                        return doneArray.push(todo)
                    default:
                        return todoArray.push(todo)
                }
            })
            this.setState({
                todo: todoArray,
                doing: doingArray,
                done: doneArray
            })
        })
    }

    draghandler = (e) => {
        getTodo(e.target.id).then(todo => this.setState({ currentTodo: todo }))
    }
    dragOverHandler = (e) => {
        e.preventDefault()
    }
    dropHandler = (cat) => {
        const currentTodo = this.state.currentTodo
        const updatedTodo = {
            completed: currentTodo.completed,
            description: currentTodo.description,
            id: currentTodo.id,
            progress: cat,
            title: currentTodo.title,
        }
        editTodo(updatedTodo).then(() => this.componentDidMount())
    }
    render() {
        return (
            <div className="app_wrapper">
                <h1>Todos</h1>
                <div className="wrapper_todos">
                    <section onDragOver={this.dragOverHandler} onDrop={()=>this.dropHandler('todo')} className="column_todo">
                        <h6>ToDo</h6>
                        {this.state.todo.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} />))}
                    </section>
                    <section onDragOver={this.dragOverHandler} onDrop={()=>this.dropHandler('doing')} className="column_doing">
                        <h6>Doing</h6>
                        {this.state.doing.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} />))}
                    </section>
                    <section onDragOver={this.dragOverHandler} onDrop={()=>this.dropHandler('done')} className="column_done">
                        <h6>Done</h6>
                        {this.state.done.map(todo => (<Todo key={todo.id}  todo={todo} drag={this.draghandler} />))}
                    </section>
                </div>
            </div >
        )
    }
}