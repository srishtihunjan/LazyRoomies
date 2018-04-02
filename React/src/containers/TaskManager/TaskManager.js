import React, { Component } from 'react';
import classes from './TaskManager.css';
import TaskList from '../../components/TaskList/TaskList';
import TaskDialog from '../../components/TaskDialog/TaskDialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Redirect } from 'react-router-dom';

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

    addNewTask = () => {
        console.log("tasktoedit: "+this.state.taskToEdit);
        this.setState({ editing: true, taskToEdit: null, taskIndex: null });
        console.log("save task");
    }

    editTask = (task, index) => {
        console.log("task index is : "+index);
        this.setState({ editing: true, taskToEdit: task, taskIndex: index });
        console.log("edit task");
    }

    closeTaskEditor = () => {
        console.log("closeTaskEditor");
        this.setState({ editing: false, taskToEdit: null, taskIndex: null });
    }

    saveTask = (newTask) => {
        if (this.state.taskIndex || this.state.taskIndex === 0) {
            
            let tempTasks = [...this.state.tasks];
            tempTasks.splice(this.state.taskIndex, 1, newTask);
            console.log("Old State : "+this.state.tasks);
            console.log("New State : "+tempTasks);
            this.setState({ tasks: tempTasks, editing: false, taskToEdit: null, taskIndex: null });
        }
        else {
            let tempTasks = [...this.state.tasks];
            tempTasks.push(newTask);
            console.log("Old State : "+JSON.stringify(this.state.tasks));
            console.log("New State : "+JSON.stringify(tempTasks));
            this.setState({ tasks: tempTasks, editing: false, taskToEdit: null, taskIndex: null });
        }
    }


    render() {

        let buttonStyle = {
            position: "fixed",
            bottom: "50px",
            right: "50px"
        }

        let taskNames = [];
        for(let i=0; i<this.state.tasks.length;i++){
            if(this.state.tasks[i])
            taskNames.push(this.state.tasks[i].name);
        }

        let redirect = null;
        if(!sessionStorage.getItem('email'))
            redirect = <Redirect to="/login" />;
        else if(!sessionStorage.getItem('apartmentName'))
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
                <FloatingActionButton style={buttonStyle}
                onClick={this.addNewTask}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default TaskManager;