import React, { Component } from 'react';
import classes from './Signup.css';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
const config = require('../../Config/Config');

class Signup extends Component {

    state = {
        email: "",
        password: "",
        name: "",
        apartmentName: "",
        phone: "",
        emailError: null,
        phoneError: null,
        nameError: null,
        passwordError: null,
        apartmentNameError: null
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

    handleApartmentNameChange = (event, newValue) => {
        this.setState({ apartmentName: newValue });
    }

    handlePhoneChange = (event, newValue) => {
        this.setState({ phone: newValue });
    }

    signupUser = () => {
        if (this.validateInput()) {
            let user = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                phone: parseInt(this.state.phone, 10)
            };

            if (this.state.apartmentName.length > 0)
                user.apartmentName = this.state.apartmentName;

            axios.post(config.url + `users/`, { ...user })
                .then(res => {
                    if (res.status === 201) {
                        //user created
                        let temp = res.data;
                        sessionStorage.setItem('userId', temp._id);
                        sessionStorage.setItem('name', temp.name);
                        if (temp.apartmentName)
                            sessionStorage.setItem('apartmentName', temp.apartmentName);

                        //redirect to homepage    
                        this.props.history.push({ pathname: '/' });
                    }
                })
                .catch(error => {
                    if (error.response.status === 400) {
                        this.setState({ apartmentNameError: "Apartment with this name does not exist" });
                    }
                    if(error.response.status === 401){
                        this.setState({ emailError: "Email already exists"});
                    }
                });
        }
    }
    
    validateInput = () => {
        let emailValid = this.validateEmail();
        let phoneValid = this.validatePhone();
        let nameValid = this.validateName();
        let passwordValid = this.validatePassword();

        if (emailValid && phoneValid && nameValid && passwordValid) {
            if (this.state.apartmentNameError)
                this.setState({ apartmentNameError: null });
            return true;
        }
        return false;
    }

    validateEmail = () => {
        var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|())@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = re.test(this.state.email);
        if (!result) {
            this.setState({ emailError: "This Email is invalid" });
            return false;
        }
        if (this.state.emailError)
            this.setState({ emailError: null });
        return true;
    }

    validatePhone = () => {
        if (!parseInt(this.state.phone, 10) || this.state.phone.length !== 10) {
            this.setState({ phoneError: "This Phone is invalid" });
            return false;
        }
        if (this.state.phoneError)
            this.setState({ phoneError: null });
        return true;
    }

    validateName = () => {
        if (this.state.name.length > 0) {
            if (this.state.nameError)
                this.setState({ nameError: null });
            return true;
        }
        this.setState({ nameError: "Name cannot be empty" });
        return false;
    }

    validatePassword = () => {
        if (this.state.password.length > 0) {
            if (this.state.passwordError)
                this.setState({ passwordError: null });
            return true;
        }
        this.setState({ passwordError: "Name cannot be empty" });
        return false;
    }

    render() {
        const style = {
            margin: 12,
        };

        let credentials = null;
        if (sessionStorage.getItem("email")) {
            credentials = sessionStorage.getItem("email");
        }

        return (
            <div className={classes.Signup} >
                <div>
                    <TextField id="Name"
                        hintText="Name"
                        floatingLabelText="Name"
                        errorText={this.state.nameError}
                        value={this.state.name}
                        onChange={this.handleNameChange} />
                </div>

                <div>
                    <TextField id="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        errorText={this.state.phoneError}
                        value={this.state.phone}
                        onChange={this.handlePhoneChange} />
                </div>

                <div>
                    <TextField id="Email"
                        hintText="Email Id"
                        floatingLabelText="Email"
                        errorText={this.state.emailError}
                        value={this.state.email}
                        onChange={this.handleEmailChange} />
                </div>

                <div>
                    <TextField id="Password"
                        hintText="Password Field"
                        floatingLabelText="Password"
                        type="password"
                        errorText={this.state.passwordError}
                        value={this.state.password}
                        onChange={this.handlePasswordChange} />
                </div>

                <div>
                    <TextField id="Apartment Name"
                        hintText="Apartment Name - Optional"
                        floatingLabelText="Apartment Name - Optional"
                        errorText={this.state.apartmentNameError}
                        value={this.state.apartmentName}
                        onChange={this.handleApartmentNameChange} />
                </div>
                <RaisedButton label="Sign Up" secondary={true} style={style} onClick={this.signupUser} />
            </div>);
    }
}

export default Signup;