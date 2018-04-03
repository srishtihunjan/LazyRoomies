import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import classes from './Calender.css';
import Toggle from 'material-ui/Toggle';
import CalendarList from '../../components/CalendarList/CalendarList';
import { Redirect } from 'react-router-dom';

class Calender extends Component {

    state = {
        tasksOnlyForUser: false,
        taskList: [
            {
                name: "clean room",
                description: "I have to clean my room before mom comes home",
                assignedTo: ["GSC", "SH"],
                dateDue: "2018-04-12T04:00:00.000Z",
                timeDue: "2018-04-12T16:21:49.158Z",
                isRecurring: false,
                recurringPeriod: null,
                status: 'Active'
            },
            {
                name: "take out trash",
                description: "I have to take out trash before yasho gets pissed",
                assignedTo: ["GSC", "SH"],
                dateDue: "2018-03-10T04:00:00.000Z",
                timeDue: "2018-03-10T16:21:49.158Z",
                isRecurring: false,
                recurringPeriod: null,
                status: 'Active'
            },
            {
                name: "do dishes",
                description: "I have to do dishes before yasho gets pissed",
                assignedTo: ["SH"],
                dateDue: "2018-03-10T04:00:00.000Z",
                timeDue: "2018-03-10T16:21:49.158Z",
                isRecurring: false,
                recurringPeriod: null,
                status: 'Active'
            },
            {
                name: "beat up yasho",
                description: "I have to beat up yasho",
                assignedTo: ["SH"],
                dateDue: "2018-03-10T04:00:00.000Z",
                timeDue: "2018-03-10T16:21:49.158Z",
                isRecurring: false,
                recurringPeriod: null,
                status: 'Completed'
            }
        ],
        overdueTasks: [],
        completedTasks: [],
        upcomingTasks: [],
        overdueTasksForUser: [],
        completedTasksForUser: [],
        upcomingTasksForUser: []
    }

    onToggle = (event, isInputChecked) => {
        this.setState({ tasksOnlyForUser: isInputChecked });
    }

    transformData = () => {
        let taskList = this.state.taskList;
        let overdueTasks = [];
        let completedTasks = [];
        let upcomingTasks = [];
        let overdueTasksForUser = [];
        let completedTasksForUser = [];
        let upcomingTasksForUser = [];

        let user = 'GSC';
        let now = new Date();

        taskList.forEach((task) => {
            //If task is active, it can be overdue or active
            if (task.status === 'Active') {
                let timeDue = new Date(task.timeDue);
                if (timeDue < now) {
                    overdueTasks.push(task);
                    if (task.assignedTo[0] === user)
                        overdueTasksForUser.push(task);
                }
                else {
                    upcomingTasks.push(task);
                    if (task.assignedTo[0] === user)
                        upcomingTasksForUser.push(task);
                }
            }
            else {
                completedTasks.push(task);
                if (task.assignedTo[0] === user)
                    completedTasksForUser.push(task);
            }
        });

        this.setState({
            overdueTasks: overdueTasks,
            completedTasks: completedTasks,
            upcomingTasks: upcomingTasks,
            overdueTasksForUser: overdueTasksForUser,
            completedTasksForUser: completedTasksForUser,
            upcomingTasksForUser: upcomingTasksForUser
        });
    }

    render() {

        let redirect = null;
        if (!sessionStorage.getItem('email'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;

        return (
            <div className={classes.Calender}>
                <div className={classes.pageTitle}>Coming Up</div>
                {redirect}
                <button onClick={this.transformData} >Transform data</button>
                <Toggle label="Only My Tasks" style={{ width: "30%" }} onToggle={this.onToggle} />
                <Card>
                    <div>Overdue Tasks</div>
                </Card>
                <CalendarList tasks={this.state.tasksOnlyForUser ? this.state.overdueTasksForUser : this.state.overdueTasks} />
                <Card>
                    <div>Upcoming Tasks</div>
                </Card>
                <CalendarList tasks={this.state.tasksOnlyForUser ? this.state.upcomingTasksForUser : this.state.upcomingTasks} />
                <Card>
                    <div>Completed Tasks</div>
                </Card>
                <CalendarList tasks={this.state.tasksOnlyForUser ? this.state.completedTasksForUser : this.state.completedTasks} />
            </div>
        );
    }
}

export default Calender;