import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import TaskManager from './containers/TaskManager/TaskManager';
import ShoppingList from './containers/ShoppingList/ShoppingList';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <TaskManager />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
