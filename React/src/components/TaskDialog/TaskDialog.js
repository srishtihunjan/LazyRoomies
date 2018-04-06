import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Toggle from 'material-ui/Toggle';

class TaskDialog extends Component {

    state = {
        name: this.props.task ? this.props.task.name : "",
        description: this.props.task ? this.props.task.description : "",
        assignedTo: this.props.task ? this.props.task.assignedTo : [],
        dateDue: this.props.task ? this.props.task.dateDue : null,
        timeDue: this.props.task ? this.props.task.timeDue : null,
        isRecurring: this.props.task ? this.props.task.isRecurring : false,
        recurringPeriod: this.props.task ? this.props.task.recurringPeriod : null,
        _id: this.props.task ? this.props.task._id : null,
        status: this.props.task ? this.props.task.status : null,
        nameEmptyWarning: false,
        nameDuplicateWarning: false,
        assignedToWarning: false,
        dateDueWarning: false,
        timeDueWarning: false,
        recurringPeriodWarning: false
    };

    //lifecycle methods
    componentWillReceiveProps = (nextProps) => {
        console.log("In componentWillReceiveProps");
        if (nextProps.task) {
            this.setState({
                name: nextProps.task.name,
                description: nextProps.task.description,
                assignedTo: nextProps.task.assignedTo,
                dateDue: new Date(nextProps.task.dateDue),
                timeDue: new Date(nextProps.task.timeDue),
                isRecurring: nextProps.task.isRecurring,
                recurringPeriod: nextProps.task.recurringPeriod,
                _id: nextProps.task._id,
                status: nextProps.task.status,
                nameEmptyWarning: false,
                nameDuplicateWarning: false,
                assignedToWarning: false,
                dateDueWarning: false,
                timeDueWarning: false,
                recurringPeriodWarning: false
            });
        }
        else {
            this.setState({
                name: "",
                description: "",
                assignedTo: [],
                dateDue: null,
                timeDue: null,
                isRecurring: false,
                recurringPeriod: null,
                status: null,
                _id: null,
                nameEmptyWarning: false,
                nameDuplicateWarning: false,
                assignedToWarning: false,
                dateDueWarning: false,
                timeDueWarning: false,
                recurringPeriodWarning: false
            });
        }
    }

    //onChange handlers
    handleTaskNameChange = (event, newValue) => {
        this.setState({ name: newValue });
    }
    handleDescriptionChange = (event, newValue) => {
        this.setState({ description: newValue });
    }
    handleAssignedUserChange = (event, index, values) => {
        if (this.state.isRecurring)
            this.setState({ assignedTo: values });
        else
            this.setState({ assignedTo: [values] });
    }
    handleDateDueChanged = (event, newDate) => {
        this.setState({ dateDue: newDate });
    }
    handleTimeDueChanged = (event, newTime) => {
        this.setState({ timeDue: newTime });
    }
    handleIsRecurringChange = (event, isChecked) => {
        if (isChecked)
            this.setState({ isRecurring: isChecked });
        else
            this.setState({ isRecurring: isChecked, assignedTo: [] });
    }
    handleRecurringPeriodChange = (event, index, value) => {
        this.setState({ recurringPeriod: value });
    }

    //validation and submit methods
    validateTaskItems = () => {
        let nameEmptyWarning = false;
        let nameDuplicateWarning = false;
        let assignedToWarning = false;
        let dateDueWarning = false;
        let timeDueWarning = false;
        let recurringPeriodWarning = false;

        if (!this.state.name || this.state.name === "")
            nameEmptyWarning = true;

        else {
            if (this.props.taskIndex === null) {
                if (this.props.taskNames.indexOf(this.state.name) !== -1)
                    nameDuplicateWarning = true;
            }
            else {
                if (this.props.taskNames.indexOf(this.state.name) !== this.props.taskIndex && this.props.taskNames.indexOf(this.state.name) !== -1)
                    nameDuplicateWarning = true;
            }
        }

        if (this.state.assignedTo.length === 0)
            assignedToWarning = true;

        if (this.state.dateDue === null)
            dateDueWarning = true;

        if (this.state.timeDue === null)
            timeDueWarning = true;

        if (this.state.isRecurring && this.state.recurringPeriod === null)
            recurringPeriodWarning = true;

        console.log(" In validateTaskItems");
        console.log(!(nameEmptyWarning || nameDuplicateWarning || assignedToWarning || dateDueWarning || timeDueWarning || recurringPeriodWarning));

        if (!(nameEmptyWarning || nameDuplicateWarning || assignedToWarning || dateDueWarning || timeDueWarning || recurringPeriodWarning)) {
            return true;
        }
        this.setState({
            nameEmptyWarning: nameEmptyWarning,
            nameDuplicateWarning: nameDuplicateWarning,
            assignedToWarning: assignedToWarning,
            dateDueWarning: dateDueWarning,
            timeDueWarning: timeDueWarning,
            recurringPeriodWarning: recurringPeriodWarning
        });
        return false;
    }
    submitClicked = () => {
        if (this.validateTaskItems()) {

            var date = new Date(this.state.dateDue);
            var time = new Date(this.state.timeDue);

            time.setDate(date.getDate());
            time.setMonth(date.getMonth());
            time.setYear(date.getFullYear());

            let newTask = {
                name: this.state.name,
                description: this.state.description,
                assignedTo: this.state.assignedTo,
                dateDue: this.state.dateDue,
                timeDue: time,
                isRecurring: this.state.isRecurring,
                recurringPeriod: this.state.recurringPeriod,
                createdBy: sessionStorage.getItem('name'),
                apartmentName: sessionStorage.getItem('apartmentName'),
                status: 'Active'
            };
            if (this.state._id)
                newTask.taskId = this.state._id;
            this.props.saveTask(newTask);
        }
        console.log(JSON.stringify(this.state));
    }

    render() {

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.closeTaskEditor}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.submitClicked}
            />
        ];

        let names = [
            'Oliver Hansen',
            'Van Henry',
            'April Tucker',
            'Ralph Hubbard',
            'Omar Alexander',
            'Carlos Abbott',
            'Miriam Wagner',
            'Bradley Wilkerson',
            'Virginia Andrews',
            'Kelly Snyder',
        ];

        if (this.props.users) {
            names = this.props.users;
        }

        const nameList = names.map((name) => (
            <MenuItem
                key={name}
                insetChildren={true}
                checked={this.state.assignedTo && this.state.assignedTo.indexOf(name) > -1}
                value={name}
                primaryText={name}
            />
        ));

        return (
            <Dialog
                title={this.props.task ? "Edit Task" : "New Task"}
                actions={actions}
                modal={false}
                open={this.props.editing}
                onRequestClose={this.props.closeTaskEditor}
                autoScrollBodyContent={true}
            >

                <TextField id="TaskName" multiLine={true}
                    value={this.state.name}
                    onChange={this.handleTaskNameChange}
                    floatingLabelText="Task Name"
                    floatingLabelFixed={true}
                    fullWidth={true}
                    errorText={this.state.nameEmptyWarning ? "The Task Name cannot be Empty" : (this.state.nameDuplicateWarning ? "The Task cannot have same name as another task" : null)} />
                <TextField id="Description" multiLine={true}
                    defaultValue={this.state.description}
                    onChange={this.handleDescriptionChange}
                    floatingLabelText="Description"
                    floatingLabelFixed={true}
                    fullWidth={true} />
                <SelectField
                    multiple={this.state.isRecurring}
                    floatingLabelText="Assigned Users"
                    floatingLabelFixed={true}
                    hintText="Select Assigned Users"
                    value={this.state.isRecurring ? this.state.assignedTo : this.state.assignedTo[0]}
                    onChange={this.handleAssignedUserChange}
                    errorText={this.state.assignedToWarning ? "The Task must have atleast one Assigned User" : null}
                >
                    {nameList}
                </SelectField>
                <DatePicker
                    floatingLabelText="Task Due Date"
                    floatingLabelFixed={true}
                    hintText="Select Task Due Date"
                    autoOk={true}
                    value={this.state.dateDue}
                    onChange={this.handleDateDueChanged}
                    minDate={new Date()}
                    errorText={this.state.dateDueWarning ? "The Due Date cannot be Empty" : null}
                />
                <TimePicker
                    floatingLabelText="Task Due Time"
                    floatingLabelFixed={true}
                    hintText="Select Task Due Time"
                    autoOk={true}
                    value={this.state.timeDue}
                    onChange={this.handleTimeDueChanged}
                    errorText={this.state.timeDueWarning ? "The Time Date cannot be Empty" : null}
                />
                <Toggle
                    label="Recurring Task"
                    toggled={this.state.isRecurring}
                    onToggle={this.handleIsRecurringChange}
                    style={{ marginTop: "1em" }}
                />
                <SelectField
                    floatingLabelText="Recurring Period"
                    floatingLabelFixed={true}
                    value={this.state.recurringPeriod}
                    onChange={this.handleRecurringPeriodChange}
                    disabled={!this.state.isRecurring}
                    errorText={this.state.recurringPeriodWarning ? "The Recurring Period cannot be Empty" : null}
                >
                    <MenuItem value="Daily" primaryText="Daily" />
                    <MenuItem value="Weekly" primaryText="Weekly" />
                    <MenuItem value="Monthly" primaryText="Monthly" />
                </SelectField>
            </Dialog>
        );
    }
}

export default TaskDialog;