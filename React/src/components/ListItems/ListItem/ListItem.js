import React from 'react';
import TextField from 'material-ui/TextField';

const listItem = (props) => {
    
        return (
            <TextField id={props.index.toString()}
            defaultValue={props.item} />
        );        
}

export default listItem;