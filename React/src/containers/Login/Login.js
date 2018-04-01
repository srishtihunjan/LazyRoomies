import React, { Component } from 'react';
import classes from './Login.css';
import TextField from 'material-ui/TextField';

class Login extends Component {

  state={
    email: "",
    password: ""
  }

  handleEmailChange = (event, newValue) => {
    this.setState({email: newValue});
  }

  handlePasswordChange = (event, newValue) => {
    this.setState({password: newValue});
  }  

  loginUser = () => {
    if(this.validateEmail(this.state.email)){
      sessionStorage.setItem('email', this.state.email);
      console.log("valid email");
    }
    else{
      console.log("invalid email");
    }
    console.log(this.state);
  }
  
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  render() {

    let credentials=null;
    if(sessionStorage.getItem("email")) {
      credentials=sessionStorage.getItem("email");
      console.log("Email set : "+credentials);
    }

    return (
      <div className={classes.Login} >
        <TextField id="Email"
          hintText="Email Id"
          floatingLabelText="Email" 
          value={this.state.email}
          onChange={this.handleEmailChange}/>
        <TextField id="Password"
          hintText="Password Field"
          floatingLabelText="Password"
          type="password" 
          value={this.state.password}
          onChange={this.handlePasswordChange}/>
        <button onClick={this.loginUser}>Login</button>
        <p>
          {credentials}
          </p>
      </div>
    );
  }
}

export default Login;