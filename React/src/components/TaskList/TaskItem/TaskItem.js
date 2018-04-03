import React from 'react';
import classes from './TaskItem.css';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const taskItem = (props) => {
    const cardHeaderChildren = (<div className={classes.flexContainer}>
        <p className={classes.headers}><strong>{props.task.name}</strong></p>
        <p className={classes.headers}> Assigned to: {props.task.assignedTo}</p> </div>);

const style = {
    margin: 25
};
    return (
        <Card>
            <CardHeader
                children={cardHeaderChildren}
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardActions>
            <RaisedButton label="Edit" primary={true} style={style}  onClick={() => props.editTask(props.task, props.index)} />
            </CardActions>
            <CardText expandable={true}>
                {props.task.description}
            </CardText>
        </Card>
    );
}

export default taskItem;