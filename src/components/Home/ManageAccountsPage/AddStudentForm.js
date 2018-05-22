import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                email: '',
                program: '',
                instructor: false
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

    // //FUNCTION FOR UPDATING INSTRUCTOR STATUS
    handleInstructor = () => {
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                instructor: !this.state.newStudent.instructor
            }
        })
    }


    // FUNCTION FOR DISPATCHING ACTION TO ADD STUDENT
    addStudent = () => {
        this.props.dispatch({
            type: 'POST_ACCOUNT',
            payload: this.state.newStudent
        })
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                email: '',
                program: ''
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
                    id="emailInput"
                    label="E-mail"
                    placeholder="E-mail"
                    margin="normal"
                    onChange={this.handleChangeFor("email")}
                    value={this.state.newStudent.email}
                 />
                <br />
                <InputLabel>Please Choose A Program</InputLabel>
                <Select
                    value={this.state.newStudent.program}
                    onChange={this.handleChangeFor("program")}
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
                <ListItem 
                onClick={() => this.handleInstructor()}
                dense
                button
                value={this.state.newStudent.instructor}
                >
                <ListItemText 
                primary='Instructor: ' 
                />
                <Checkbox
                tabIndex={-1}
                disableRipple
                />
                </ListItem>
                <br />
                <Button variant="outlined" onClick={() => this.addStudent()}>
                    Add Student 
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(AddStudentForm);