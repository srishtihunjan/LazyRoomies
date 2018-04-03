import React from 'react';
import { Card } from 'material-ui/Card';

const CalendarItem = (props) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let date = new Date(props.task.dateDue);
    let month = monthNames[date.getMonth()];
    let day = date.getDate();

    let time = new Date(props.task.timeDue);
    let timeStr = time.getHours() + ":" + time.getMinutes();

    let markAsCompletedButton = null;
    if(props.markTaskAsCompleted)
        markAsCompletedButton = <button onClick={() => props.markAsCompletedButton(props.task)} >Completed</button>;
    
    return (
        <Card>
            <div>
                <div style={{ width: "10%", backgroundColor: 'blue', color: 'white', display: 'inline-block' }}>
                    {month} {day}
                </div>
                <div style={{ width: "10%", backgroundColor: 'BlueViolet ', color: 'white', display: 'inline-block' }}>
                    {timeStr}
                </div>
                <div style={{ width: "50%", display: 'inline-block' }}>
                    <div>{props.task.name}</div>

                </div>
                <div style={{ width: "30%", display: 'inline-block' }}>Assigned To: {props.task.assignedTo.join(", ")}</div>
            </div>


        </Card>
    );
}

export default CalendarItem;