import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import classes from './Apartment.css';
import { Redirect } from 'react-router-dom';

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
        sessionStorage.setItem('apartmentName', this.state.newApartmentName);
        console.log("new apartment from session: "+ sessionStorage.getItem('apartmentName'));
        this.props.history.push({pathname: '/'});
    }

    joinExistingApartment =() => {
        console.log("Join existing apartment with name : "+this.state.existingApartmentName);
        sessionStorage.setItem('apartmentName', this.state.existingApartmentName);
    }

    render() {

        let redirect = null;
        if(!sessionStorage.getItem('email'))
            redirect = <Redirect to="/login" />;
        else
            console.log(sessionStorage.getItem('email')+redirect);
        
        return (
            <div className={classes.Apartment}>
                {redirect}
                <div>
                    <p>Create new Apartment</p>
                    <TextField id="NewApartmenNamet" multiLine={true}
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