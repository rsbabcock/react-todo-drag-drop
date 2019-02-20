import React, { Component } from 'react';
// import logo from './logo.svg';
import TodoList from './components/TodoList'
import './index.css'

class App extends Component {
  state = {
    theme: 'light'
  }

  handleThemeChange = () => {
    if(this.state.theme === 'light'){
        this.setState({ theme: 'dark'})
    } 
    if(this.state.theme === 'dark'){
        this.setState({ theme: 'light'})
    }
 }
  render() {
    let themeChange;
    if(this.state.theme === 'light'){
      themeChange = 'Dark'
    } else { themeChange = 'Light'}
    return (
      <div className={`theme-${this.state.theme}`} id="app">
        <button onClick={this.handleThemeChange}>{`Go ${themeChange}`}</button>
        <TodoList theme={this.state.theme}/>
      </div>
    );
  }
}

export default App;
