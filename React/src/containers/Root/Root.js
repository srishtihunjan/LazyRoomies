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
import shoppingListLogo from '../../icons/ShoppingCart.png';
import taskmanagerLogo from '../../icons/AllTasks.png';
import logoutLogo from '../../icons/Logout.png';
import comingupLogo from '../../icons/ComingUp.png';
import housedetailsLogo from '../../icons/HouseDetails.png';
import feedbackLogo from '../../icons/Feedback.png';

class Root extends Component {

    render() {
        return (
            <div className={classes.root}>
                <header className={classes.header}>Lazy Roomies</header>
                <div className={classes.sideDrawer}>
                    <div>
                        <NavLink to="/calendar" className = {classes.menulink} exact activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="Coming Up" src={comingupLogo} />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/" exact className = {classes.menulink} activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="All Tasks" src={taskmanagerLogo} />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/shopping-list" className = {classes.menulink} exact activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="Shopping List" src={shoppingListLogo} />
                        </NavLink>
                    </div>
                    <div>
                        <NavLink to="/apartment-info" className = {classes.menulink} exact activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="Apartment Info" src={housedetailsLogo} />
                        </NavLink>
                    </div>
                    <div>
                        <a className = {classes.menulink} href="https://ufl.qualtrics.com/jfe/form/SV_esKkgesMC8HCEx7" target="_new" activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="Feedback" src={feedbackLogo} />
                        </a>
                    </div>
                    <div>
                        <NavLink to="/logout" className = {classes.menulink} exact activeStyle={{
                            backgroundColor: 'rgb(0, 188, 212)'
                        }}>
                            <img className={classes.resizeImage} border="0" alt="Logout" src={logoutLogo} />
                        </NavLink>
                    </div>
                </div>
                <Route path='/' exact component={TaskManager} />
                <Route path='/shopping-list' exact component={ShoppingList} />
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