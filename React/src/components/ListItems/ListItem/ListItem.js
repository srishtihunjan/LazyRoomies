import React from 'react';
import TextField from 'material-ui/TextField';
import classes from './ListItem.css'

const listItem = (props) => {
    return (
        <div>
            <div className={classes.symbol}>o</div>
            <TextField className={classes.temp} id={props.index.toString()}
                defaultValue={props.item.value}
                onChange={props.onChange}
                onKeyPress={props.enterPressedHandler} />
        </div>
    );
}

export default listItem;