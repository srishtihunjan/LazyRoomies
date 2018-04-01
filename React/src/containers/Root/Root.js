import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import TaskManager from '../TaskManager/TaskManager';
import ShoppingList from '../ShoppingList/ShoppingList';
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
                </Drawer>
                <Route path='/' exact component={TaskManager} />
                <Route path='/shopping-list' exact render={() => <ShoppingList />} />
                <Route path='/login' exact component={Login} />
                <Route path='/signup' exact component={Signup} />
            </div>
        );
    }
}

export default Root;