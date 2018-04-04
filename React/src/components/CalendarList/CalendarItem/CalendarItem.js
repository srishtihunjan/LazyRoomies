import React from 'react';
import classes from './CalendarItem.css';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const CalendarItem = (props) => {
    let overdueStyle = props.overdueStyle;
    console.log(overdueStyle);
    const style = {
        margin: 12,
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date(props.task.dateDue);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();

    let time = new Date(props.task.timeDue);
    let timeStr = time.getHours() + ":" + time.getMinutes();

    let markAsCompletedButton = null;
    if (props.markTaskAsCompleted)
        markAsCompletedButton = <RaisedButton label="Mark As Complete" primary={true} style={style} onClick={() => props.markTaskAsCompleted(props.task)} />

    return (
        <Card>
            <div style={overdueStyle} className={classes.cardRow}>
                <div className={classes.dateField}>
                    {month} {day}
                </div>
                <div className={classes.dateField}>
                    {timeStr}
                </div>
                <div className={classes.taskField}>
                    <span style={{ fontWeight: "bold" }}>{props.task.name}</span>

                </div>
                <div className={classes.assignedField}>Assigned To: {props.task.assignedTo.join(", ")}</div>
                <div className={classes.completedButton}> {markAsCompletedButton}</div>
            </div>
        </Card>
    );
}

export default CalendarItem;