import React, { Component } from 'react';
// import logo from './logo.svg';
import TodoList from './components/TodoList'
import './index.css'

class App extends Component {
  state = {
    theme: 'light'
  }

  handleThemeChange = (event) => {
     this.setState({ theme: event.target.value})
 }
  render() {
    return (
      <div className={`theme-${this.state.theme}`} id="app">
        <TodoList theme={this.state.theme} themeChange={this.handleThemeChange}/>
      </div>
    );
  }
}

export default App;
