import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const taskDeleteConfirmDialog = (props) => {

    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={props.closeTaskDeleteConfirmDialog}
        />,
        <FlatButton
            label="Delete"
            primary={true}
            keyboardFocused={true}
            onClick={props.deleteTask}
        />
    ];

    return (
        <Dialog
        title="Delete Task"
        actions={actions}
        modal={false}
        open={props.taskDeleteConfirmation}
        onRequestClose={props.closeTaskDeleteConfirmDialog}
    >
    <div>Are you sure you want to delete this task?</div>
     </Dialog> 
    );
}

export default taskDeleteConfirmDialog;