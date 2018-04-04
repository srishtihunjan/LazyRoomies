import React from 'react';
import classes from './TaskItem.css';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const taskItem = (props) => {
    let recurringPer = props.task.recurringPeriod;
    if (props.task.recurringPeriod === null) {
        recurringPer = "Off";
    }
    let date = new Date(props.task.dateDue);
    let time = new Date(props.task.timeDue);
    const cardHeaderChildren = (
        <div>
            <div className={classes.taskName}>
                {props.task.name}
            </div>
            <div className={classes.taskProps}>
                <div className={classes.headers}>
                    Description: {props.task.description}
                </div>
            </div>
            <div className={classes.taskProps}>
                <div className={classes.headers}>
                    Status: {props.task.status}
                </div>
                <div className={classes.headers2}>
                    Assigned to: {props.task.assignedTo}
                </div>
            </div>
            <div className={classes.taskProps}>
                <div className={classes.headers}>
                    Due: {date.toDateString()}, {time.getHours()}:{time.getMinutes()}
                </div>
                <div className={classes.headers2}>
                    Recurring: {recurringPer}
                </div>
            </div>
        </div>);

    const style = {
        margin: 25
    };
    return (
        <Card>
            <CardHeader children={cardHeaderChildren} />
            <CardActions>
                <RaisedButton label="Edit" primary={true} style={style} onClick={() => props.editTask(props.task, props.index)} />
                <RaisedButton className={classes.deleteButton} label="Delete" secondary={true} style={style} onClick={() => props.editTask(props.task, props.index)} />
            </CardActions>
        </Card>
    );
}

export default taskItem;