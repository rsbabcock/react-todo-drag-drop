import React, { Component } from 'react'
import '../index.css'

export default class TodoInput extends Component {

    render() {
        const { title, description } = this.props;
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Add Todo</label>
                    <input
                        type="text"
                        placeholder="Title"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={this.props.handleChange}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={this.props.handleChange}
                    />
                    <button type="submit" className="btn_submit" onKeyPress={this.props.handleSubmit}>
                        SAVE
                      </button>
                </div>
            </form>
        );
    }
}