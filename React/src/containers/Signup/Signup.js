import React, { Component } from 'react';
import classes from './Signup.css';
import TextField from 'material-ui/TextField';

class Signup extends Component {

    state = {
        email: "",
        password: "",
        name: "",
        houseId: "",
        emailError: null
    }

    handleEmailChange = (event, newValue) => {
        this.setState({ email: newValue });
    }

    handlePasswordChange = (event, newValue) => {
        this.setState({ password: newValue });
    }

    handleNameChange = (event, newValue) => {
        this.setState({ name: newValue });
    }

    handleHouseIdChange = (event, newValue) => {
        this.setState({ houseId: newValue });
    }

    signupUser = () => {
        if (this.validateEmail(this.state.email)) {
            sessionStorage.setItem('email', this.state.email);
            console.log("valid email");
        }
        else {
            console.log("invalid email");
            this.setState({ emailError: true });
        }
        console.log(this.state);
    }

    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    render() {
        let credentials = null;
        if (sessionStorage.getItem("email")) {
            credentials = sessionStorage.getItem("email");
            console.log("Email set : " + credentials);
        }
        let errorMessage = null;
        if (this.state.emailError)
            errorMessage = "This Email is invalid"

        return (
            <div className={classes.Login} >
                <TextField id="Name"
                    hintText="Name"
                    floatingLabelText="Name"
                    errorText={errorMessage}
                    value={this.state.name}
                    onChange={this.handleNameChange} />
                <TextField id="Email"
                    hintText="Email Id"
                    floatingLabelText="Email"
                    errorText={errorMessage}
                    value={this.state.email}
                    onChange={this.handleEmailChange} />
                <TextField id="Password"
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange} />
                <TextField id="HouseId"
                    hintText="House Id - Optional"
                    floatingLabelText="HouseId - Optional"
                    value={this.state.houseId}
                    onChange={this.handleHouseIdChange} />
                <button onClick={this.signupUser}>SignUp</button>
                <p>
                    {credentials}
                </p>
            </div>);
    }
}

export default Signup;