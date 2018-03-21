import React from 'react';
import ListItem from './ListItem/ListItem';

const listItems = (props) => {

    let items = props.listItems.map((item, index) => {
        return <ListItem key={index} index={index} item={item}/>;
    });
    console.log(items);
    return (items);
}

export default listItems;