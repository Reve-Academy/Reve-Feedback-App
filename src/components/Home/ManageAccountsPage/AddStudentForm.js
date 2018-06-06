import React, { Component } from 'react';
import { connect } from 'react-redux';
// const nodemailer = require('nodemailer');


//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
//import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => ({
    state,
  });

//Modal Styling
const styles = theme => ({
    sendBtn: {
      borderRadius: '15px',
      border: '1px solid #D8441C',
      marginTop: '30px',
      maxHeight: '36px',  
    },
});

const itemStyle = ({
    centerContent: {
      display: 'flex',
      justifyContent: 'center'
    }
  })


class AddStudentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newStudent: {
                first: '',
                last: '',
                username: '',
                team: '',
                program: '',
                password: 'toBeEncrypted', 
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
                first: '',
                last: '',
                username: '',
                team: '',
                program: '',

            }
        })
    };

    demoButton = () => {
        this.setState({
            newStudent: {
                ...this.state.newStudent,
                first: 'Amanda',
                last: 'Olson',
                username: 'amandaOlson8999@gmail.com',
                team: '3M Technical Project',
                program: 'Spring 2018',

            }
        })
    };

    componentDidMount() {
        // use component did mount to dispatch an action to request the studentList from the API
        this.props.dispatch({ type: 'GET_PROGRAM_SAGA'});
    }

    render(){
        const { classes } = this.props;
        //mapping for selector drop down
        let programMenuItem = this.props.state.home_AllProgramPageReducer.allProgramsReducer.map((program) => {
            return <MenuItem key={program.id} value={program.id}>{program.name}</MenuItem>
        })

        return(
            <div>
                <h3 className="ManageTitle">Create new student account</h3>
                <TextField
                    id="firtnameInput"
                    label="First Name"
                    placeholder="First Name"
                    margin="normal"
                    onChange={this.handleChangeFor("first")}
                    value={this.state.newStudent.first}
                 />
                 <br/>
                 <TextField
                    id="lastnameInput"
                    label="Last Name"
                    placeholder="Last Name"
                    margin="normal"
                    onChange={this.handleChangeFor("last")}
                    value={this.state.newStudent.last}
                 />
                 <br/>
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
                
                <div style={itemStyle.centerContent}>
                    <Button className={classes.sendBtn} variant="outlined" color="primary" onClick={() => this.addStudent()}>
                        Send Student Email
                    </Button>
                    <h3 style={{color: "white", fontSize: "20px"}} onClick={this.demoButton}>*</h3>
                </div>
            </div>
        )
    }
}

let addStudentFormWithStyle = withStyles(styles)(AddStudentForm)
export default connect(mapStateToProps)(addStudentFormWithStyle);
