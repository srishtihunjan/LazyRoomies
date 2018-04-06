import React, { Component } from 'react';
import classes from './ApartmentInfo.css';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ToggleStar from 'material-ui/svg-icons/toggle/star-border';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const config = require('../../Config/Config');

class ApartmentInfo extends Component {

    state = {
        users: [],
        userId: null
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
                this.setState({ users: users , userId: sessionStorage.getItem('userId')});
            }
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    render() {

        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;
        
        let userList = this.state.users.map((user) => {
            return (
                <ListItem className={classes.user} key={user.id} primaryText={user.name} leftIcon={(user.id === this.state.userId ? <ActionGrade style={{height:"30px", width:"48px"}}/> : <ToggleStar style={{height:"30px", width:"48px"}}/>)} insetChildren={true} />
            );
        });

        let apartmentName = sessionStorage.getItem('apartmentName');
        return (
            <div className={classes.ApartmentInfo}>
                {redirect}
                <div className={classes.pageTitle}>Lazy Roomies of {apartmentName}</div>
                <List>{userList}</List>
            </div>
        );
    }
}

export default ApartmentInfo;