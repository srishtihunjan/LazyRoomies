import React, { Component } from 'react';
import classes from './ShoppingList.css';
import ListItems from '../../components/ListItems/ListItems';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const config = require('../../Config/Config');

class ShoppingList extends Component {

    state = {
        list: [],
        open: false,
        message: ""
    }

    componentDidMount = () => {
        let apartmentName = sessionStorage.getItem('apartmentName');

        console.log("componentDidMount");
        axios.get(config.url + `shoppinglist/` + apartmentName)
            .then(res => {
                console.log("shoppinglist fetched from apartment : ");
                if (typeof res.data === 'string')
                    this.setState({ list: [] });
                else {
                    let shoppinglist = res.data[0].shoppingList.map(item => {
                        return { key: Math.random().toString(), value: item };
                    });
                    if (shoppinglist.length === 0)
                        shoppinglist.push({ key: Math.random().toString(), value: "" })
                    console.log("shoppinglist : " + JSON.stringify(shoppinglist));
                    this.setState({ list: shoppinglist });
                }
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    inputChangeHandler = (event, newValue, index) => {
        let oldList = this.state.list;
        let newList = [...oldList];
        newList[index].value = newValue;
        this.setState({ list: newList });
    }

    clearEntryHandler = (index) => {
        let oldList = this.state.list;
        let newList = [...oldList];
        newList[index] = { key: Math.random().toString(), value: "" };
        this.setState({ list: newList });
    }

    enterPressedHandler = (env, index) => {
        if (env.key === 'Enter') {
            console.log("Enter pressed");
            let oldList = this.state.list;
            let newList = [...oldList];
            newList.splice(index + 1, 0, { key: Math.random().toString(), value: '' });
            this.setState({ list: newList });
        }
    }

    saveList = () => {
        let apartmentName = sessionStorage.getItem('apartmentName');
        let shoppingList = this.state.list.map(item => {
            return item.value;
        });

        let req = {
            apartmentName: apartmentName,
            shoppingList: shoppingList
        };
        console.log(req);

        axios.post(config.url + `shoppinglist/`, { ...req })
            .then(res => {
                console.log("Shopping List successfully saved");
                this.setState({ open: true, message: "Shopping List successfully saved" });
            })
            .catch(err => {
                console.log("Error saving Shopping List");
                this.setState({ open: true, message: "Error saving Shopping List" });
            });
    }

    render() {
        const style = {
            margin: 12,
        };

        console.log(JSON.stringify(this.state.list));

        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;

        return (
            <div className={classes.ListContainer}>
                <div className={classes.pageTitle}>Shared Shopping List</div>
                {redirect}
                <ListItems listItems={this.state.list}
                    inputChangeHandler={this.inputChangeHandler}
                    enterPressedHandler={this.enterPressedHandler}
                    clearEntryHandler={this.clearEntryHandler} />
                <div>
                    <RaisedButton label="Save List" primary={true} style={style} onClick={this.saveList}/>
                </div>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                />
            </div>
        );
    }
}

export default ShoppingList;