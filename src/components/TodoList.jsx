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
            description: '',
            newTodoAdded: false
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
            description: currentTodo.description,
            id: currentTodo.id,
            progress: cat,
            title: currentTodo.title,
        }
        editTodo(updatedTodo).then(() => this.componentDidMount())
    }
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit = (event) => {
        if (this.state.newTodoAdded) {
            this.setState({ newTodoAdded: false })
        } else {
            const newTodo = {
                completed: false,
                description: this.state.description,
                progress: 'todo',
                title: this.state.title
            }
            event.preventDefault();
            saveToDo(newTodo).then(() => {
                this.componentDidMount()
                this.setState({ newTodoAdded: true, title: '', description: '' })
            })
        }
    }
    handleDelete = (todo) => {
        deleteToDo(todo).then( () => {
            this.setState({ newTodoAdded: false})
            this.componentDidMount()
        })
    }
    render() {
        return (
            <div className="app_wrapper">
                <h1>Todos</h1>
                <TodoInput
                    title={this.state.title}
                    description={this.state.description}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange} />
                <div className="wrapper_todos">
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('todo')} className="column_todo">
                        <h6>ToDo</h6>
                        {this.state.todo.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete}/>))}
                    </section>
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('doing')} className="column_doing">
                        <h6>Doing</h6>
                        {this.state.doing.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete}/>))}
                    </section>
                    <section onDragOver={this.dragOverHandler} onDrop={() => this.dropHandler('done')} className="column_done">
                        <h6>Done</h6>
                        {this.state.done.map(todo => (<Todo key={todo.id} todo={todo} drag={this.draghandler} delete={this.handleDelete}/>))}
                    </section>
                </div>
            </div >
        )
    }
}