import React, { Component } from 'react';
import classes from './Calender.css';
import Toggle from 'material-ui/Toggle';
import CalendarList from '../../components/CalendarList/CalendarList';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const config = require('../../Config/Config');

class Calender extends Component {

    state = {
        tasksOnlyForUser: false,
        tasks: [
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
        upcomingTasksForUser: [],
        open: false,
        message: ""
    }

    componentDidMount = () => {
        let user = sessionStorage.getItem('name');
        let apartmentName = sessionStorage.getItem('apartmentName');
        if (!user)
            this.props.history.replace({ pathname: '/login' });
        if (!apartmentName)
            this.props.history.replace({ pathname: '/apartment' });

        axios.get(config.url + `tasks/` + apartmentName)
            .then(res => {
                console.log("tasks fetched from apartment : ");
                if (typeof res.data === 'string')
                    this.setState({ tasks: [] });
                else {
                    this.setState({ tasks: res.data }, this.transformData);
                    console.log("transform data called");
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    onToggle = (event, isInputChecked) => {
        console.log(JSON.stringify(this.state));
        this.setState({ tasksOnlyForUser: isInputChecked });
    }

    onSnackBarClose = () => {
        this.setState({ open: false, message: "" });
    }

    transformData = () => {
        let overdueTasks = [];
        let upcomingTasks = [];
        let completedTasks = [];
        let overdueTasksForUser = [];
        let completedTasksForUser = [];
        let upcomingTasksForUser = [];

        let user = sessionStorage.getItem('name');
        let now = new Date();

        let taskList = this.state.tasks;
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

        console.log("In transform data: ");
        console.log("overdue tasks : " + JSON.stringify(overdueTasks));
        console.log("upcoming tasks : " + upcomingTasks);
    }

    markTaskAsCompleted = (task) => {
        let tempTask = { ...task };

        axios.post(config.url + `tasks/completed/`, tempTask)
            .then(res => {
                console.log("Task marked as completed");
                let apartmentName = sessionStorage.getItem('apartmentName');

                axios.get(config.url + `tasks/` + apartmentName)
                    .then(res => {
                        console.log("tasks fetched from apartment : ");
                        if (typeof res.data === 'string')
                            this.setState({ tasks: [], open: true, message: "Successfully Marked Task as Completed" });
                        else {
                            this.setState({ tasks: res.data, open: true, message: "Successfully Marked Task as Completed" }, this.transformData);
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    });

            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {

        const toggleStyle =
            window.screen.availWidth < 780 ? { marginTop: "1em", width: "60%" } : { float: "right", width: "15%" };
        console.log(window.screen.availWidth);
        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;

        return (
            <div className={classes.Calender}>
                <div className={classes.pageTitle}>Coming Up</div>
                {redirect}
                <Toggle label="Only My Tasks" style={toggleStyle} onToggle={this.onToggle} />
                <div className={classes.subTitles}>Overdue Tasks ({this.state.tasksOnlyForUser ? this.state.overdueTasksForUser.length : this.state.overdueTasks.length})</div>
                <CalendarList style={{ backgroundColor: "red" }} tasks={this.state.tasksOnlyForUser ? this.state.overdueTasksForUser : this.state.overdueTasks} markTaskAsCompleted={this.markTaskAsCompleted} overdueStyle={{ backgroundColor: "#fee2e1" }} />
                <div className={classes.subTitles}>Upcoming Tasks ({this.state.tasksOnlyForUser ? this.state.upcomingTasksForUser.length : this.state.upcomingTasks.length})</div>
                <CalendarList tasks={this.state.tasksOnlyForUser ? this.state.upcomingTasksForUser : this.state.upcomingTasks} markTaskAsCompleted={this.markTaskAsCompleted} overdueStyle={{ backgroundColor: "#fff3cd" }} />
                <div className={classes.subTitles}>Completed Tasks ({this.state.tasksOnlyForUser ? this.state.completedTasksForUser.length : this.state.completedTasks.length})</div>
                <CalendarList tasks={this.state.tasksOnlyForUser ? this.state.completedTasksForUser : this.state.completedTasks} overdueStyle={{ backgroundColor: "#dbf2e3" }} />
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    autoHideDuration={3000}
                    onRequestClose={this.onSnackBarClose}
                />
            </div>
        );
    }
}

export default Calender;