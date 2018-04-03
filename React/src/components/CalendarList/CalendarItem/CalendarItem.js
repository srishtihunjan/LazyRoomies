import React from 'react';
import { Card } from 'material-ui/Card';

const CalendarItem = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date(props.task.dateDue);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();

    let time=new Date(props.task.timeDue);
    let timeStr = time.getHours() + ":" + time.getMinutes();

    let markAsCompletedButton = null;
    if(props.markTaskAsCompleted)
        markAsCompletedButton = <button onClick={() => props.markAsCompletedButton(props.task)} >Completed</button>;
    
    return (
        <Card>
            <div style={{ width: "10%", float: "left", backgroundColor: 'blue', color: 'white', height: "100%" }}>
                {month}
                <br />
                {day}
            </div>
            <div style={{ width: "10%", float: "left", backgroundColor: 'BlueViolet ', color: 'white', height: "100%" }}>
                {timeStr}
            </div>
            <div style={{ width: "80%", float: "right", height: "100%" }}>
                <div>{props.task.name}</div>
                <div>Assigned To: {props.task.assignedTo.join(", ")}</div>
                {markAsCompletedButton}
            </div>
            <br style={{ clear: "both" }} />
        </Card>
    );
}

export default CalendarItem;