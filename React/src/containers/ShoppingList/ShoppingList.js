import React, { Component } from 'react';
import classes from './ShoppingList.css';
import ListItems from '../../components/ListItems/ListItems'

class ShoppingList extends Component {

    state = {
        list: ['firstItem', 'secondItem']
    }

    render() {
        return (
            <div className={classes.ListContainer}>
                <ListItems listItems={this.state.list} />
                <div>
                    <button>Save</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;