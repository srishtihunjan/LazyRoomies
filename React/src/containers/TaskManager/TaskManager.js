import React, { Component } from 'react';
import classes from './TaskManager.css';
import TaskList from '../../components/TaskList/TaskList';
import TaskDialog from '../../components/TaskDialog/TaskDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const config = require('../../Config/Config');

class TaskManager extends Component {

    state = {
        tasks: [{
            name: "task name 1",
            description: "this is the task name 1",
            assignedTo: ["GSC"],
            dateDue: null,
            timeDue: null,
            isRecurring: false,
            recurringPeriod: null
        },
        {
            name: "task name 2",
            description: "this is the task name 2",
            assignedTo: ["YMJ"],
            dateDue: null,
            timeDue: null,
            isRecurring: false,
            recurringPeriod: null
        }],
        users: ["GSC", "YMJ", "SH"],
        editing: false,
        taskToEdit: null,
        taskIndex: null
    }
    
    componentDidMount = () => {
        let user = sessionStorage.getItem('name');
        let apartmentName = sessionStorage.getItem('apartmentName');
        if (!user)
            this.props.history.replace({ pathname: '/login' });
        if (!apartmentName)
            this.props.history.replace({ pathname: '/apartment' });

        console.log(apartmentName);
        axios.get(config.url + `tasks/` + apartmentName)
            .then(res => {
                console.log("tasks fetched from apartment : ");
                if (typeof res.data === 'string')
                    this.setState({ tasks: [] });
                else {
                    this.setState({ tasks: res.data });
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err.response);
            });

        axios.get(config.url + `users/all/` + apartmentName)
            .then(res => {
                console.log("users fetched from apartment : ");
                if (typeof res.data === 'string')
                    this.setState({ users: [] });
                else {
                    let users = res.data.map(user => {
                        return user.name;
                    });
                    this.setState({ users: users });
                }
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    addNewTask = () => {
        console.log("tasktoedit: " + this.state.taskToEdit);
        this.setState({ editing: true, taskToEdit: null, taskIndex: null });
        console.log("save task");
    }

    editTask = (task, index) => {
        console.log("task index is : " + index);
        this.setState({ editing: true, taskToEdit: task, taskIndex: index });
        console.log("edit task");
    }

    closeTaskEditor = () => {
        console.log("closeTaskEditor");
        this.setState({ editing: false, taskToEdit: null, taskIndex: null });
    }

    saveTask = (newTask) => {
        if (this.state.taskIndex || this.state.taskIndex === 0) {
            axios.post(config.url + `tasks/update/`, { ...newTask })
                .then(res => {
                    if (res.status === 201) {
                        //user created
                        console.log(res);

                        let apartmentName = sessionStorage.getItem('apartmentName');
                        axios.get(config.url + `tasks/` + apartmentName)
                            .then(res => {
                                console.log("tasks fetched from apartment : ");
                                if (typeof res.data === 'string')
                                    this.setState({ tasks: [] });
                                else {
                                    this.setState({ tasks: res.data, editing: false, taskToEdit: null, taskIndex: null  });
                                }
                            })
                            .catch(err => {
                                console.log(err.response);
                                this.setState({ editing: false, taskToEdit: null, taskIndex: null });
                            });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });

            // let tempTasks = [...this.state.tasks];
            // tempTasks.splice(this.state.taskIndex, 1, newTask);
            // console.log("Old State : " + this.state.tasks);
            // console.log("New State : " + tempTasks);
            // this.setState({ tasks: tempTasks, editing: false, taskToEdit: null, taskIndex: null });
        }
        else {
            let tempNewTask = { ...newTask };
            tempNewTask.status = 'Active';
            console.log(tempNewTask);
            axios.post(config.url + `tasks/insert/`, { ...tempNewTask })
                .then(res => {
                    if (res.status === 201) {
                        //user created
                        console.log(res);

                        let apartmentName = sessionStorage.getItem('apartmentName');
                        axios.get(config.url + `tasks/` + apartmentName)
                            .then(res => {
                                console.log("tasks fetched from apartment : ");
                                if (typeof res.data === 'string')
                                    this.setState({ tasks: [] });
                                else {
                                    this.setState({ tasks: res.data, editing: false, taskToEdit: null, taskIndex: null  });
                                }
                            })
                            .catch(err => {
                                console.log(err.response);
                                this.setState({ editing: false, taskToEdit: null, taskIndex: null });
                            });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }


    render() {
        let taskNames = [];
        for (let i = 0; i < this.state.tasks.length; i++) {
            if (this.state.tasks[i])
                taskNames.push(this.state.tasks[i].name);
        }

        let redirect = null;
        if (!sessionStorage.getItem('userId'))
            redirect = <Redirect to="/login" />;
        else if (!sessionStorage.getItem('apartmentName'))
            redirect = <Redirect to="/apartment" />;

        return (
            <div className={classes.TaskManager}>
                {redirect}
                <div>Add new task bar</div>
                <TaskList tasks={this.state.tasks}
                    editTask={this.editTask} />
                <TaskDialog task={this.state.taskToEdit}
                    editing={this.state.editing}
                    closeTaskEditor={this.closeTaskEditor}
                    saveTask={this.saveTask}
                    users={this.state.users}
                    taskNames={taskNames}
                    taskIndex={this.state.taskIndex}
                />
                <FloatingActionButton className={classes.floatingButton}
                    onClick={this.addNewTask}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default TaskManager;