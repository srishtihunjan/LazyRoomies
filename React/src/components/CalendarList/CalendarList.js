import React from 'react';
import CalendarItem from './CalendarItem/CalendarItem';

const calendarList = (props) => {

    let items = props.tasks.map( (item, index) => {
        return <CalendarItem key={item.name} 
        task={item} 
        index={index} />;
    });

    return (items);
}

export default calendarList;