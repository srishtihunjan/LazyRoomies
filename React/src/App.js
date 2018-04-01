import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import Root from './containers/Root/Root';
import { BrowserRouter } from 'react-router-dom';


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
