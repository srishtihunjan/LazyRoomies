import React, { Component } from 'react';
import classes from './ShoppingList.css';
import ListItems from '../../components/ListItems/ListItems';
import RaisedButton from 'material-ui/RaisedButton';

class ShoppingList extends Component {

    state = {
        list: ['firstItem', 'secondItem']
    }



    inputChangeHandler = (event, index) => {
        let value = event.target.value;
        console.log(value);
        console.log(index);
        let oldList = this.state.list;
        let newList = [...oldList];
        newList[index] = value;
        this.setState({ list: newList });
    }

    enterPressedHandler = (env, index) => {
        if (env.key === 'Enter') {
            console.log("Enter pressed");
            let oldList = this.state.list;
            let newList = [...oldList];
            newList.splice(index + 1, 0, '');
            console.log("New list: " + newList)
            this.setState({ list: newList });
        }
    }
    render() {
        const style = {
            margin: 12,
        };
        return (
            <div className={classes.ListContainer}>
                <ListItems listItems={this.state.list}
                    inputChangeHandler={this.inputChangeHandler}
                    enterPressedHandler={this.enterPressedHandler} />
                <div>
                    <RaisedButton label="Save List" primary={true} style={style} />
                </div>
            </div>
        );
    }
}

export default ShoppingList;