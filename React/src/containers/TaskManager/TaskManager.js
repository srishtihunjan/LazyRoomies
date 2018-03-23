import React, { Component } from 'react';
import classes from './TaskManager.css';
import TaskList from '../../components/TaskList/TaskList'

class TaskManager extends Component {

    state = {
        tasks: [{
            name: "task name 1",
            assigned: [],
            recurring: [],
            status: "active"
        }]
    }

    render() {
        return (
            <div className={classes.TaskManager}>
                <div>Add new task bar</div>
                <TaskList tasks={this.state.tasks}/>
            </div>
        );
    }
}

export default TaskManager;