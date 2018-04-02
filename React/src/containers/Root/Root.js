import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import TaskManager from '../TaskManager/TaskManager';
import ShoppingList from '../ShoppingList/ShoppingList';
import Apartment from '../Apartment/Apartment';
import ApartmentInfo from '../ApartmentInfo/ApartmentInfo';
import Calender from '../Calender/Calender';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import classes from './Root.css';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class Root extends Component {

    render() {
        return (
            <div className={classes.Root}>
                <Drawer open={true} width="15%">
                    <NavLink to="/" exact activeClassName="active" activeStyle={{
                        backgroundColor: 'coral',
                        fontWeight: 'bold',
                        color: 'red'
                    }}><MenuItem>TaskManager</MenuItem></NavLink>
                    <MenuItem><NavLink to='/shopping-list' exact activeClassName="active">ShoppingList</NavLink></MenuItem>
                    <MenuItem><NavLink to='/calendar' exact activeClassName="active">Calendar</NavLink></MenuItem>
                </Drawer>
                <Route path='/' exact component={TaskManager} />
                <Route path='/shopping-list' exact render={() => <ShoppingList />} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
                <Route path='/apartment' exact component={Apartment} />
                <Route path='/apartment-info' exact component={ApartmentInfo} />
                <Route path='/calendar' exact component={Calender} />
            </div>
        );
    }
}

export default Root;