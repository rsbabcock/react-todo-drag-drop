import React, { Component } from 'react'
import '../index.css'

export default class TodoInput extends Component {

    render() {
        const { title } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Add Todo"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.props.handleChange}
                        onSubmit={this.props.handleSubmit}
                    />
                </div>
            </form>
        );
    }
}