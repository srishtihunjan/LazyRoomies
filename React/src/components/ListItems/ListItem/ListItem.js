import React from 'react';
import TextField from 'material-ui/TextField';
import classes from './ListItem.css';
import checkboxSmall from '../../../icons/checkboxsmall.png';

const listItem = (props) => {
    return (
        <div>
            <img className={classes.resizeImage} border="0" alt="All Tasks" src={checkboxSmall} />
            <TextField className={classes.temp} id={props.index.toString()}
                defaultValue={props.item.value}
                onChange={props.onChange}
                onKeyPress={props.enterPressedHandler} />
            <button onClick={props.clearEntryHandler} >clear</button>
        </div>
    );
}

export default listItem;