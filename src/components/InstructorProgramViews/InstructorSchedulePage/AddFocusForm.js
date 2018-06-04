import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
//import InputLabel from '@material-ui/core/InputLabel';
//import Select from '@material-ui/core/Select';

const mapStateToProps = state => ({
    state,
});

const itemStyle = ({
    btn: {
      borderRadius: '15px',
      border: '1px solid #D8441C',
      height: '36px'
    },
    centerContent: {
        display: 'flex',
        justifyContent: 'center'
    }
})

class AddFocusForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newFocus: {
                name: '',
                summary: '',
                x: 0,
                y: 0,
                w: 1,
                h: 2
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

    addNewFocus = () => {
        this.props.dispatch({
            type: 'ADD_FOCUS',
            payload: {
                infoToAdd: this.state,
                week: this.props.state.scheduleReducer.thisWeekReducer 
            }
        })
        this.props.handleCloseFocus();
    }

    demoButton = () => {
        this.setState({
            newFocus: {
                name: 'SEO',
                summary: 'Search Engine Optimization',
                x: 0,
                y: 0,
                w: 1,
                h: 2
            },
            newStrategy: {
                title: 'Google Activity',
                summary: 'SEO',
                focusId: ''
            },
            newResource: {
                link: 'www.google.com',
                strategyId: ''
            }
        });
    }


    render(){
        return(
            <div>
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
                <div style={itemStyle.centerContent}>
                    <Button style={itemStyle.btn} onClick={() => this.addNewFocus()} variant="outlined" color="primary" type="submit">Add Focus</Button>
                    <h3 style={{color: "white", }} onClick={this.demoButton}>*</h3>
                </div>
            {/* </form>           */}
            </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddFocusForm);