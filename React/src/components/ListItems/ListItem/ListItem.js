import React from 'react';
import TextField from 'material-ui/TextField';
import classes from './ListItem.css'

const listItem = (props) => {
    if (props.item === '') {
        return (
            <div>
                <div className={classes.symbol}>o</div>
                <TextField className={classes.temp} id={props.index.toString()}
                    onChange={props.inputChangeHandler}
                    onKeyPress={props.enterPressedHandler} />
            </div>
        );
    }
    return (
        <div>
            <div className={classes.symbol}>o</div>
            <TextField className={classes.temp} id={props.index.toString()}
                defaultValue={props.item === '' ? (" yo" + props.index.toString()) : props.item}
                onChange={props.inputChangeHandler}
                onKeyPress={props.enterPressedHandler} />
        </div>
    );
}

export default listItem;