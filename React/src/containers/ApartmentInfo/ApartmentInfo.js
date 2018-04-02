import React, { Component } from 'react';
import classes from './ApartmentInfo.css';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ToggleStar from 'material-ui/svg-icons/toggle/star-border';
import Home from 'material-ui/svg-icons/action/home';

class ApartmentInfo extends Component {

    state={
        users: ["GSC", "YMJ", "SH"],
        user: "YMJ",
    }

    render() {

        let userList = this.state.users.map((user) => {
            console.log("user : "+user);
            console.log(user === this.state.user);
            return(
                // <div className={(user === this.state.user ? classes.CurrentUser : classes.User)} key={user}>{user}</div>
                <ListItem key={user} primaryText={user} leftIcon={(user === this.state.user ? <ActionGrade />: <ToggleStar />)} insetChildren={true} />
            );
        });

        let apartmentName = sessionStorage.getItem('apartmentName');
        return (
            <div className={classes.ApartmentInfo}>
                <div className={classes.Apartment}><Home style={{width: "40px", height:"40px"}}/> {apartmentName} </div>
                <div>Users
                <List>{userList}</List>
                </div>
            </div>
        );
    }
}

export default ApartmentInfo;