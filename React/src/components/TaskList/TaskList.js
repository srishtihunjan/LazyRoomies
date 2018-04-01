import React from 'react';
import TaskItem from './TaskItem/TaskItem';

const taskList = (props) => {

    let items = props.tasks.map( (item, index) => {
        return <TaskItem key={item.name} 
        task={item} 
        index={index}
        editTask = {props.editTask}/>;
    });

    return (items);
}

export default taskList;