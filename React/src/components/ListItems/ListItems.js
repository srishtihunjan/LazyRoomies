import React from 'react';
import ListItem from './ListItem/ListItem';

const listItems = (props) => {

    let items = props.listItems.map((item, index) => {
        return <ListItem key={item.key} 
        index={index} 
        item={item} 
        onChange={(event, newValue) => props.inputChangeHandler(event, newValue, index)}
        enterPressedHandler={(env) => props.enterPressedHandler(env, index)} 
        deleteEntryHandler={() => props.deleteEntryHandler(index)}/>;
    });
    console.log(items);
    return (items);
}

export default listItems;