import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import ShoppingList from './containers/ShoppingList/ShoppingList';
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <ShoppingList />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
