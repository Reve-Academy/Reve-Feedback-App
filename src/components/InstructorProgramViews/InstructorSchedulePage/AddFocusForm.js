import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    state,
  });

class AddFocusForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newFocus: {
                name: '',
                summary: '',
                weekId: '',
                startDay: '',
                x: 0,
                y: 0,
                w: 2,
                h: 1
            },
            newStrategy: {
                title: '',
                summary: '',
                focusId: ''
            },
            newResource: {
                link: '',
                strategyId: ''
            }
        }
    }

    //FUNCTION FOR UPDATING NEWFOCUS STATE WITH INPUT FIELDS
    handleFocusChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newFocus: {
                ...this.state.newFocus,
                [propertyName]: event.target.value
                },
                ...this.state.newStrategy,
                ...this.state.newResource
            })
        }
    };

    //FUNCTION FOR SETTING START DAY SO FOCUS WILL POPULATE ON CORRECT DAY
    handleStartChangeFor = (event) => {
        if(event.target.value === 'monday'){
            return (
                this.setState({
                    newFocus: {
                        ...this.state.newFocus,
                        startDay: 'monday',
                        x: 0,
                        y: 0,
                        w: 2,
                        h: 1
                    },
                    ...this.state.newStrategy,
                    ...this.state.newResource
                })
            )
        } else if(event.target.value === 'tuesday'){
            return (
                this.setState({
                    newFocus: {
                        ...this.state.newFocus,
                        startDay: 'tuesday',
                        x: 2,
                        y: 0,
                        w: 2,
                        h: 1
                    },
                    ...this.state.newStrategy,
                    ...this.state.newResource
                })
            )
        } else if(event.target.value === 'wednesday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'wednesday',
                        x: 4,
                        y: 0,
                        w: 2,
                        h: 1
                    },
                    ...this.state.newStrategy,
                    ...this.state.newResource
                })
            )
        } else if(event.target.value === 'thursday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'thursday',
                        x: 6,
                        y: 0,
                        w: 2,
                        h: 1
                    },
                    ...this.state.newStrategy,
                    ...this.state.newResource
                })
            )
        } else if(event.target.value === 'friday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'friday',
                        x: 8,
                        y: 0,
                        w: 2,
                        h: 1
                    },
                    ...this.state.newStrategy,
                    ...this.state.newResource
                })
            )
        }
    }

    addNewFocus = () => {
        this.props.dispatch({
            type: 'ADD_FOCUS',
            payload: this.state.newFocus
        })
    }


    render(){
        return(
            <div>
                <h3>Focus</h3>
                <TextField
                    id="focusName"
                    label="Focus"
                    placeholder="Name"
                    margin="normal"
                    onChange={this.handleFocusChangeFor("name")}
                    value={this.state.newFocus.name}
                />
                <TextField
                    id="focusSummary"
                    label="Summary"
                    placeholder="Summary"
                    margin="normal"
                    onChange={this.handleFocusChangeFor("summary")}
                    value={this.state.newFocus.summary}
                />
                <br />
                <InputLabel>Select Start Date</InputLabel>
                <Select
                    onChange={this.handleStartChangeFor}
                    value={this.state.newFocus.startDay}
                    inputProps={{
                        name: 'StartDaySelector',
                        id: 'StartDaySelectorForm',
                    }}
                >
                    {/* <MenuItem value="">
                        <em>None</em>
                    </MenuItem> */}
                    <MenuItem value="monday">
                        <em>Monday</em>
                    </MenuItem>
                    <MenuItem value="tuesday">
                        <em>Tuesday</em>
                    </MenuItem>
                    <MenuItem value="wednesday">
                        <em>Wednesday</em>
                    </MenuItem>
                    <MenuItem value="thursday">
                        <em>Thursday</em>
                    </MenuItem>
                    <MenuItem value="friday">
                        <em>Friday</em>
                    </MenuItem>
                </Select>
                <h3>Strategy</h3>
                <h3>Resources</h3>
                <Button variant="outlined" color="primary" onClick={() => this.addNewFocus()}>Add Focus</Button>          
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddFocusForm);