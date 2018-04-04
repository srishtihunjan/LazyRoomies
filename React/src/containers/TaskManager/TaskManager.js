import React, { Component } from 'react';
import classes from './TaskManager.css';
import TaskList from '../../components/TaskList/TaskList';
import TaskDialog from '../../components/TaskDialog/TaskDialog';
import TaskDeleteConfirmDialog from '../../components/TaskDeleteConfirmDialog/TaskDeleteConfirmDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const config = require('../../Config/Config');

class TaskManager extends Component {

    state = {
        tasks: [],
        users: [],
        editing: false,
        taskToEdit: null,
        taskIndex: null,
        taskDeleteConfirmation: false,
        taskToDeleteIndex: null,
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
                                    this.setState({ tasks: res.data, editing: false, taskToEdit: null, taskIndex: null, open: true, message: "Successfully Saved Task" });
                                }
                            })
                            .catch(err => {
                                console.log(err.response);
                                this.setState({ editing: false, taskToEdit: null, taskIndex: null, open: true, message: "Error while saving Task" });
                            });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });

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
                                    this.setState({ tasks: res.data, editing: false, taskToEdit: null, taskIndex: null, open: true, message: "Successfully Saved Task" });
                                }
                            })
                            .catch(err => {
                                console.log(err.response);
                                this.setState({ editing: false, taskToEdit: null, taskIndex: null, open: true, message: "Error while Saving Task" });
                            });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }

    deleteTask = (id) => {
        axios.delete(config.url + `tasks/` + id)
            .then(res => {
                console.log("deleted successfully");

                let apartmentName = sessionStorage.getItem('apartmentName');
                axios.get(config.url + `tasks/` + apartmentName)
                    .then(res => {
                        console.log("tasks fetched from apartment : ");
                        if (typeof res.data === 'string')
                            this.setState({ tasks: [], open: true, message: "Successfully Deleted Task", taskDeleteConfirmation: false, taskToDeleteIndex: null });
                        else {
                            this.setState({ tasks: res.data, open: true, message: "Successfully Deleted Task", taskDeleteConfirmation: false, taskToDeleteIndex: null });
                        }
                    })
                    .catch(err => {
                        console.log(err.response);
                    });
            })
            .catch(err => {
                console.log(JSON.stringify(err.response));
            })
    }

    closeTaskDeleteConfirmDialog = () => {
        this.setState({ taskDeleteConfirmation: false, taskToDeleteIndex: null });
    }

    deleteTaskClicked = (id) => {
        this.setState({ taskDeleteConfirmation: true, taskToDeleteIndex: id });
    }

    onSnackBarClose = () => {
        this.setState({ open: false, message: "" });
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

        console.log("tasks : " + this.state.tasks);
        return (
            <div className={classes.TaskManager}>
                {redirect}
                <div className={classes.pageTitle}>All Tasks</div>
                <TaskList tasks={this.state.tasks}
                    editTask={this.editTask}
                    deleteTask={this.deleteTaskClicked} />
                <TaskDialog task={this.state.taskToEdit}
                    editing={this.state.editing}
                    closeTaskEditor={this.closeTaskEditor}
                    saveTask={this.saveTask}
                    users={this.state.users}
                    taskNames={taskNames}
                    taskIndex={this.state.taskIndex}
                />
                <TaskDeleteConfirmDialog deleteTask={() => this.deleteTask(this.state.taskToDeleteIndex)}
                    taskDeleteConfirmation={this.state.taskDeleteConfirmation}
                    closeTaskDeleteConfirmDialog={this.closeTaskDeleteConfirmDialog}
                />
                <FloatingActionButton className={classes.floatingButton}
                    onClick={this.addNewTask}>
                    <ContentAdd />
                </FloatingActionButton>
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

export default TaskManager;