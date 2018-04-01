import React, { Component } from 'react';
import classes from './ShoppingList.css';
import ListItems from '../../components/ListItems/ListItems'

class ShoppingList extends Component {

    state = {
        list: [{key: "1", value: 'firstItem'}, 
            {key: "2", value: 'secondItem'}]
    }

    inputChangeHandler = (event, newValue, index) => {;
        let oldList = this.state.list;
        let newList = [...oldList];
        newList[index].value=newValue;
        console.log("oldList"+oldList);
        console.log("newList"+newList);
        this.setState({list: newList});
    }
 
    enterPressedHandler = (env, index) => {
        if(env.key === 'Enter'){
            console.log("Enter pressed");
            let oldList = this.state.list;
            let newList = [...oldList];
            newList.splice(index+1, 0,{key:Math.random().toString(), value: ''});
            console.log("Old State: "+ oldList);
            console.log("New list: "+newList)
            this.setState({list: newList});
        }
    }
    render() {
        return (
            <div className={classes.ListContainer}>
                <ListItems listItems={this.state.list} 
                inputChangeHandler={this.inputChangeHandler}
                enterPressedHandler={this.enterPressedHandler} />
                <div>
                    <button>Save</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;