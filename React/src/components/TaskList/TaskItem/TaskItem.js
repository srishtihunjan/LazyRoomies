import React from 'react';
import classes from './TaskItem.css';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Toggle from 'material-ui/Toggle';

const taskItem = (props) => {

    const styles = {
        block: {
            maxWidth: 250,
        },
        toggle: {
            marginBottom: 16,
        },
        thumbOff: {
            backgroundColor: '#ffcccc',
        },
        trackOff: {
            backgroundColor: '#ff9d9d',
        },
        thumbSwitched: {
            backgroundColor: 'red',
        },
        trackSwitched: {
            backgroundColor: '#ff9d9d',
        },
        labelStyle: {
            color: 'red',
        },
    };

    let toggleStyle = {}
    let labelStyle = {}
    if (props.task.status === "overdue"){
        toggleStyle.color = 'red';
        labelStyle.color = 'red';
    }

    if (props.task.status === "active"){
        toggleStyle.color = 'green';
        labelStyle.color = 'green';
    }
    
    return (
        <Auxillary>
            <div className={classes.Title}>
                <div className={classes.TaskName} style={labelStyle}>
                {props.task.name}
                </div>
                <Toggle
                index = {}
                    defaultToggled={true}
                    style={toggleStyle}
                    thumbStyle={styles.thumbOff}
      trackStyle={styles.trackOff}
      thumbSwitchedStyle={styles.thumbSwitched}
      trackSwitchedStyle={styles.trackSwitched}
                />
            </div>
            <div>{JSON.stringify(props.task)}</div>
        </Auxillary>
    );
}

export default taskItem;