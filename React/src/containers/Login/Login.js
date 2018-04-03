import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Login.css';
import TextField from 'material-ui/TextField';
import axios from 'axios';
const config = require('../../Config/Config');

class Login extends Component {

  state = {
    email: "",
    password: "",
    emailError: null,
    passwordError: null,
    validationFail: <br />
  }

  handleEmailChange = (event, newValue) => {
    this.setState({ email: newValue });
  }

  handlePasswordChange = (event, newValue) => {
    this.setState({ password: newValue });
  }

  loginUser = () => {
    let validEmail = this.validateEmail();
    let validPassword = this.validatePassword();
    if (validEmail && validPassword) {
      axios.get(config.url + `users/login/` + this.state.email + "/" + this.state.password)
        .then(res => {
          if (res.status === 200) {
            var user = res.data[0];
            sessionStorage.setItem('userId', user._id);
            sessionStorage.setItem('name', user.name);
            if (user.apartmentName)
              sessionStorage.setItem('apartmentName', user.apartmentName);
            //redirect to homepage    
            this.props.history.push({ pathname: '/' });
          }
        })
        .catch(res2 => {
          if(res2.response){
            if(res2.response.status === 401)
              this.setState({validationFail: (<p style={{color: 'red'}}>Validation Failed</p>)});
          }
        });
    }
  }

  validateEmail = () => {
    var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|())@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = re.test(this.state.email);
    if (!result) {
      this.setState({ emailError: "Invalid Email" });
      return false;
    }
    if (this.state.emailError)
      this.setState({ emailError: null });
    return true;
  }

  validatePassword = () => {
    if (this.state.password.length === 0) {
      this.setState({ passwordError: "Invalid Password" });
      return false;
    }
    if (this.state.passwordError)
      this.setState({ passwordError: null });
    return true;
  }

  render() {

    let credentials = null;
    if (sessionStorage.getItem("email")) {
      credentials = sessionStorage.getItem("email");
    }

    return (
      <div className={classes.Login} >
        {this.state.validationFail}
        <TextField id="Email"
          hintText="Email Id"
          floatingLabelText="Email"
          errorText={this.state.emailError}
          value={this.state.email}
          onChange={this.handleEmailChange} />
        <TextField id="Password"
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
          errorText={this.state.passwordError}
          value={this.state.password}
          onChange={this.handlePasswordChange} />
        <button onClick={this.loginUser}>Login</button>
        <p>Don't have a login yet? <Link
          to='/signup'>Sign Up</Link></p>
        <p>
          {credentials}
        </p>
      </div>
    );
  }
}

export default Login;