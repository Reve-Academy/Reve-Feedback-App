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

const itemStyle = ({
    btn: {
      borderRadius: '15px',
      border: '1px solid #D8441C',
    }
})

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
                }
            })
        }
    };

    //FUNCTION FOR UPDATING NEWSTRATEGY STATE WITH INPUT FIELDS
    handleStrategyChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newStrategy: {
                ...this.state.newStrategy,
                [propertyName]: event.target.value
                },
            })
        }
    };

    //FUNCTION FOR UPDATING NEWSTRATEGY STATE WITH INPUT FIELDS
    handleResourceChangeFor = (propertyName) => {
        return (event) => {
            this.setState({
                newResource: {
                ...this.state.newResource,
                [propertyName]: event.target.value
                },
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
                        w: 1,
                        h: 1
                    },
                })
            )
        } else if(event.target.value === 'tuesday'){
            return (
                this.setState({
                    newFocus: {
                        ...this.state.newFocus,
                        startDay: 'tuesday',
                        x: 1,
                        y: 0,
                        w: 1,
                        h: 1
                    },
                })
            )
        } else if(event.target.value === 'wednesday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'wednesday',
                        x: 2,
                        y: 0,
                        w: 1,
                        h: 1
                    },
                })
            )
        } else if(event.target.value === 'thursday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'thursday',
                        x: 3,
                        y: 0,
                        w: 1,
                        h: 1
                    },
                })
            )
        } else if(event.target.value === 'friday'){
            return (
                this.setState({
                    newFocus:{
                        ...this.state.newFocus,
                        startDay: 'friday',
                        x: 4,
                        y: 0,
                        w: 1,
                        h: 1
                    },
                })
            )
        }
    }

    addNewFocus = () => {
        this.props.dispatch({
            type: 'ADD_FOCUS',
            payload: this.state
        })
        // this.props.generateLayout();
        // this.props.generateDOM();
    }


    render(){
        return(
            <div>
            {/* <form onSubmit={() => this.addNewFocus()} className="focusForm"> */}
            <div>
                <h3>Focus</h3>
                <TextField
                    id="focusName"
                    label="Focus"
                    fullWidth
                    placeholder="Name"
                    margin="normal"
                    onChange={this.handleFocusChangeFor("name")}
                    value={this.state.newFocus.name}
                />
                <br />
                <TextField
                    id="focusSummary"
                    label="Summary"
                    multiline
                    fullWidth
                    rowsMax="20"
                    placeholder="Summary"
                    margin="normal"
                    onChange={this.handleFocusChangeFor("summary")}
                    value={this.state.newFocus.summary}
                />
                <br />
                <InputLabel>Select Start Day</InputLabel>
                <Select
                    onChange={this.handleStartChangeFor}
                    value={this.state.newFocus.startDay}
                    autoWidth
                    display="flex"
                    inputProps={{
                        name: 'StartDaySelector',
                        id: 'StartDaySelectorForm',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
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
                <TextField
                    id="strategyTitle"
                    label="Strategy"
                    fullWidth
                    placeholder="title"
                    margin="normal"
                    onChange={this.handleStrategyChangeFor("title")}
                    value={this.state.newStrategy.title}
                />
                <br />
                <TextField
                    id="strategySummary"
                    label="Summary"
                    multiline
                    fullWidth
                    rowsMax="20"
                    placeholder="Summary"
                    margin="normal"
                    onChange={this.handleStrategyChangeFor("summary")}
                    value={this.state.newStrategy.summary}
                />
                <h3>Resources</h3>
                <TextField
                    id="resourceLink"
                    label="Link"
                    multiline
                    fullWidth
                    rowsMax="20"
                    placeholder="Resource Link"
                    margin="normal"
                    onChange={this.handleResourceChangeFor("link")}
                    value={this.state.newResource.link}
                />
                <br />
                <Button style={itemStyle.btn} onClick={() => this.addNewFocus()} variant="outlined" color="primary" type="submit">Add Focus</Button>
            {/* </form>           */}
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddFocusForm);