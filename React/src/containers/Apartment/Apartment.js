import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import classes from './Apartment.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
const config = require('../../Config/Config');

class Apartment extends Component {

    state = {
        newApartmentName: "",
        existingApartmentName: "",
        newApartmentError: null,
        existingApartmentError: null
    }

    handleNewApartmentNameChange = (event, newValue) => {
        this.setState({ newApartmentName: newValue });
    }

    handleExistingApartmentNameChange = (event, newValue) => {
        this.setState({ existingApartmentName: newValue });
    }

    createNewApartment = () => {
        console.log("Create new apartment with name : " + this.state.newApartmentName);
        console.log("USER ID PRINT:" + sessionStorage.getItem('userId'));
        let req = {
            userId: sessionStorage.getItem('userId'),
            name: this.state.newApartmentName
        };

        axios.post(config.url + `apartments/`, { ...req })
            .then(res => {
                console.log("Res:" + JSON.stringify(res));
                console.log("State:" + JSON.stringify(this.state));
                if (res.status === 201) {
                    //user created
                    sessionStorage.setItem('apartmentName', this.state.newApartmentName);
                    //redirect to homepage
                    this.props.history.push({ pathname: '/' });
                }
            })
            .catch(error => {
                this.setState({ newApartmentError: "Apartment with this name already exists" });
            });
    }

    joinExistingApartment = () => {
        console.log("Join existing apartment with name : " + this.state.existingApartmentName);

        let req = {
            userId: sessionStorage.getItem('userId'),
            apartmentName: this.state.existingApartmentName
        };

        axios.post(config.url + `users/joinapt`, { ...req })
            .then(res => {
                console.log("Join APT Res:" + JSON.stringify(res));
                console.log("JOIN APT State:" + JSON.stringify(this.state));
                if (res.status === 201) {
                    //user created
                    sessionStorage.setItem('apartmentName', this.state.existingApartmentName);
                    //redirect to homepage    
                    this.props.history.push({ pathname: '/' });
                }
            })
            .catch(error => {
                this.setState({ existingApartmentError: "Apartment with this name does not exist" });
            });
    }

    render() {
        const style = {
            margin: 12,

        };
        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        console.log(sessionStorage.getItem('userId'));
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('apartmentName'));
        return (
            <div className={classes.Apartment}>
                {redirect}
                <div className={classes.apartmentOptions}>
                    <div className={classes.pageTitle}>Create New Apartment</div>
                    <div>
                        <TextField id="NewApartmenName" multiLine={true}
                            value={this.state.newApartmentName}
                            onChange={this.handleNewApartmentNameChange}
                            hintText="Enter New Apartment Name"
                            floatingLabelFixed={true}
                            errorText={this.state.newApartmentError} />
                    </div>
                    <div>
                        <RaisedButton label="Create Apartment" labelStyle={{ fontSize: '1.2em' }} primary={true} style={style} onClick={this.createNewApartment} />
                    </div>
                </div>
                <div className={classes.apartmentOptions}>
                    <div className={classes.pageTitle}>Join Existing Apartment</div>
                    <div>
                        <TextField id="ExistingApartmentName" multiLine={true}
                            value={this.state.existingApartmentName}
                            onChange={this.handleExistingApartmentNameChange}
                            hintText="Enter Existing Apartment Name"
                            floatingLabelFixed={true}
                            errorText={this.state.existingApartmentError} />
                    </div>
                    <div>
                        <RaisedButton label="Join Apartment" labelStyle={{ fontSize: '1.2em' }} secondary={true} style={style} onClick={this.joinExistingApartment} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Apartment;