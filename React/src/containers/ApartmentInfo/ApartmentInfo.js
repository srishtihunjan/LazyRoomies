import React, { Component } from 'react';
import classes from './ApartmentInfo.css';
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ToggleStar from 'material-ui/svg-icons/toggle/star-border';

class ApartmentInfo extends Component {

    state = {
        users: ["GSC", "YMJ", "SH"],
        user: "YMJ",
    }

    render() {

        let userList = this.state.users.map((user) => {
            console.log("user : " + user);
            console.log(user === this.state.user);
            return (
                <ListItem className={classes.user} key={user} primaryText={user} leftIcon={(user === this.state.user ? <ActionGrade style={{height:"30px", width:"48px"}}/> : <ToggleStar style={{height:"30px", width:"48px"}}/>)} insetChildren={true} />
            );
        });

        let apartmentName = sessionStorage.getItem('apartmentName');
        return (
            <div className={classes.ApartmentInfo}>
                <div className={classes.pageTitle}>Lazy Roomies of {apartmentName}</div>
                <List>{userList}</List>
            </div>
        );
    }
}

export default ApartmentInfo;