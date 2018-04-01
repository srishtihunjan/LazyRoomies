import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
<<<<<<< HEAD
import TaskManager from './containers/TaskManager/TaskManager';
import ShoppingList from './containers/ShoppingList/ShoppingList';
=======
import Root from './containers/Root/Root';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 9c695d09cdcd939d05f236c1e514252151c9c892

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div className="App">
            <Root />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
