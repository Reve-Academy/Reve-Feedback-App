import React, { Component } from 'react';
import { connect } from 'react-redux';
// const nodemailer = require('nodemailer');


//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const mapStateToProps = state => ({
    state,
  });


class AddStudentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newStudent: {
                username: '',
                team: '',
                program: '',
                password: '', 
            }
        }
    }
    //FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
    handleChangeFor = (propertyName) => {
        return (event) => {
          this.setState({
            newStudent: {
            ...this.state.newStudent,
            [propertyName]: event.target.value
            }
        })
     }
    };


    // on CLICK, CREATES NEW STUDENT ACCOUNT - TODO: with random password instead of empty string
    addStudent = () => {
        this.props.dispatch({
            type: 'POST_ACCOUNT',
            payload: this.state.newStudent
        })
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                username: '',
                team: '',
                program: '',

            }
        })
    };

    componentDidMount() {
        // use component did mount to dispatch an action to request the studentList from the API
        this.props.dispatch({ type: 'GET_PROGRAM_SAGA'});
    }

    render(){
        //mapping for selector drop down
        let programMenuItem = this.props.state.home_AllProgramPageReducer.allProgramsReducer.map((program) => {
            return <MenuItem key={program.id} value={program.id}>{program.name}</MenuItem>
        })

        return(
            <div>
                <TextField
                    id="usernameInput"
                    label="E-mail"
                    placeholder="E-mail"
                    margin="normal"
                    onChange={this.handleChangeFor("username")}
                    value={this.state.newStudent.username}
                 />
                 <br/>
                 <TextField
                    id="teamInput"
                    label="Team"
                    placeholder="Team"
                    margin="normal"
                    onChange={this.handleChangeFor("team")}
                    value={this.state.newStudent.team}
                 />
                <br />
                <InputLabel>Select Program   </InputLabel>
                <Select
                    onChange={this.handleChangeFor("program")}
                    value={this.state.newStudent.program}
                    inputProps={{
                        name: 'ProgramSelector',
                        id: 'ProgramSelectorForm',
                    }}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {programMenuItem}
                </Select>
                <br />
                <Button variant="outlined" onClick={() => this.addStudent()}>
                    Send Student Email
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddStudentForm);
