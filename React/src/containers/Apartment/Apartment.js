import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import classes from './Apartment.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
        console.log("Create new apartment with name : "+this.state.newApartmentName);
        let req = {
            userId: sessionStorage.getItem('userId'),
            name: this.state.newApartmentName
        };

        axios.post(config.url + `apartments/`, { ...req })
        .then(res => {
            if(res.status === 201){
                //user created
                sessionStorage.setItem('apartmentName', this.state.newApartmentName);
                //redirect to homepage    
                this.props.history.push({pathname: '/'});
            }
        })
        .catch(error => {
            this.setState({newApartmentError: "Apartment with this name already exists"});
        });
    }

    joinExistingApartment = () => {
        console.log("Join existing apartment with name : "+this.state.existingApartmentName);

        let req = {
            userId: sessionStorage.getItem('userId'),
            apartmentName: this.state.existingApartmentName
        };

        axios.post(config.url + `users/joinapt`, { ...req })
        .then(res => {
            if(res.status === 201){
                //user created
                sessionStorage.setItem('apartmentName', this.state.existingApartmentName);
                //redirect to homepage    
                this.props.history.push({pathname: '/'});
            }
        })
        .catch(error => {
                this.setState({existingApartmentError: "Apartment with this name does not exist"});
        });
    }

    render() {

        let redirect = null;
        if(!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        console.log(sessionStorage.getItem('userId'));
        console.log(sessionStorage.getItem('name'));
        console.log(sessionStorage.getItem('apartmentName'));
        return (
            <div className={classes.Apartment}>
                {redirect}
                <div>
                    <p>Create new Apartment</p>
                    <TextField id="NewApartmenName" multiLine={true}
                        value={this.state.newApartmentName}
                        onChange={this.handleNewApartmentNameChange}
                        floatingLabelText="New Apartment Name"
                        floatingLabelFixed={true} 
                        errorText={this.state.newApartmentError}/>
                    <button onClick={this.createNewApartment}>Create Apartment</button>
                </div>
                <div >
                    <p>Join Existing Apartment</p>
                    <TextField id="ExistingApartmentName" multiLine={true}
                        value={this.state.existingApartmentName}
                        onChange={this.handleExistingApartmentNameChange}
                        floatingLabelText="Existing Apartment Name"
                        floatingLabelFixed={true} 
                        errorText={this.state.existingApartmentError} />
                    <button onClick={this.joinExistingApartment} >Join Apartment</button>
                </div>
            </div>
        );
    }
}

export default Apartment;