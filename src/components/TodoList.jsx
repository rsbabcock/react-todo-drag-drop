import React, { Component } from 'react'
import { getTodos, getTodo, editTodo, saveToDo, deleteToDo } from '../api/api'
import Todo from './Todo'
import TodoInput from './AddTodoInput'
import '../index.css'

export default class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            todo: [],
            doing: [],
            done: [],
            currentTodo: {},
            title: '',
            newTodoAdded: false,
            value: ''
        };
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
            id: currentTodo.id,
            progress: cat,
            title: currentTodo.title,
        }
        editTodo(updatedTodo).then(() => this.componentDidMount())
    }
    handleChange = (event) => {
        if (event.target.id === '') {
            this.setState({ value: event.target.value });
            this.props.themeChange(event)
        } else {
            this.setState({ [event.target.id]: event.target.value })
        }
    }
    handleSubmit = (event) => {
        if (this.state.newTodoAdded) {
            this.setState({ newTodoAdded: false })
        } else {
            const newTodo = {
                completed: false,
                progress: 'todo',
                title: this.state.title
            }
            event.preventDefault();
            saveToDo(newTodo).then(() => {
                this.componentDidMount()
                this.setState({ newTodoAdded: true, title: '' })
            })
        }
    }
    handleDelete = (todo) => {
        deleteToDo(todo).then(() => {
            this.setState({ newTodoAdded: false })
            this.componentDidMount()
        })
    }
    render() {
        return (
            <div className={`wrapper_app ${this.props.theme}`}>
                <form>
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="light">Light Theme</option>
                        <option value="dark">Dark Theme</option>
                        <option value="party">Party Theme</option>
                    </select>
                </form>
                <h1>Todos</h1>
                <TodoInput
                    title={this.state.title}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange} />
                <div className="wrapper_todos">
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('todo')} className="column_todo">
                        <h4>ToDo</h4>
                        {this.state.todo.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete} />))}
                    </section>
                    <span />
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('doing')} className="column_doing">
                        <h4>Doing</h4>
                        {this.state.doing.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete} />))}
                    </section>
                    <span />
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('done')} className="column_done">
                        <h4>Done</h4>
                        {this.state.done.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete} />))}
                    </section>
                </div>
            </div >
        )
    }
}