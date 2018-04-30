import React, { Component } from 'react';
import classes from './ApartmentInfo.css';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ToggleStar from 'material-ui/svg-icons/toggle/star-border';
import { Redirect } from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';
import axios from 'axios';
const config = require('../../Config/Config');

class ApartmentInfo extends Component {

    state = {
        users: [],
        userId: null,
        userName: null,
        snackbarOpen: false,
        snackbarMessage: ""
    }

    componentDidMount = () => {
        let apartmentName = sessionStorage.getItem('apartmentName');

        axios.get(config.url + `users/all/` + apartmentName)
        .then(res => {
            console.log("users fetched from apartment : ");
            if (typeof res.data === 'string')
                this.setState({ users: [] });
            else {
                let users = res.data.map(user => {
                    return {name: user.name, id: user._id};
                });
                this.setState({ users: users , userId: sessionStorage.getItem('userId'), userName: sessionStorage.getItem('name')});
                console.log("userName: "+sessionStorage.getItem('name'))
            }
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    alertUser = (userId, username) => {
        console.log("Alert user");
        axios.get(config.url + 'users/remind/'+this.state.userName+'/'+userId)
        .then(res => {
            console.log("user alerted ");
            let message = "Successfully Reminded "+username;
            this.setState({ snackbarOpen: true, snackbarMessage: message });
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    renderAlertButton = (user) => {
        if(user.id !== this.state.userId)
            return <button onClick={() => this.alertUser(user.id, user.name)}>Remind {user.name}</button>;
        return null;
    }

    onSnackBarClose = () => {
        this.setState({ snackbarOpen: false, snackbarMessage: "" });
    }

    render() {

        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;
        
        let userList = this.state.users.map((user) => {
            return (
                <div key={user.id}>
                <ListItem className={classes.user} key={user.id} primaryText={user.name} 
                leftIcon={(user.id === this.state.userId ? <ActionGrade style={{height:"30px", width:"48px"}}/> : <ToggleStar style={{height:"30px", width:"48px"}}/>)} 
                insetChildren={true} 
                />
                { this.renderAlertButton(user)}
                </div>
            );
        });

        let apartmentName = sessionStorage.getItem('apartmentName');
        return (
            <div className={classes.ApartmentInfo}>
                {redirect}
                <div className={classes.pageTitle}>Lazy Roomies of {apartmentName}</div>
                <List>{userList}</List>
                <Snackbar
                    open={this.state.snackbarOpen}
                    message={this.state.snackbarMessage}
                    autoHideDuration={3000}
                    onRequestClose={this.onSnackBarClose}
                />
            </div>
        );
    }
}

export default ApartmentInfo;