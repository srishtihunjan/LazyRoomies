import React from 'react';
import TextField from 'material-ui/TextField';

const listItem = (props) => {
    if(props.item === ''){
        return (
            <TextField id={props.index.toString()}
            onChange={props.inputChangeHandler}
            onKeyPress={props.enterPressedHandler}/>
        ); 
    }
        return (
            <TextField id={props.index.toString()}
            defaultValue={props.item === ''? (" yo"+props.index.toString()) : props.item} 
            onChange={props.inputChangeHandler}
            onKeyPress={props.enterPressedHandler}/>
        );        
}

export default listItem;