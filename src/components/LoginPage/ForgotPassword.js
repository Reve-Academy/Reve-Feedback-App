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


class ForgotPasswordModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPassword: {
            email: '', 
            }
        }
        }
    
    //FUNCTION FOR UPDATING STATE WITH INPUT FIELDS
    handleChangeFor = (propertyName) => {
        return (event) => {
          this.setState({
            newPassword: {
            ...this.state.newPassword,
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
            newPassword: {
                ...this.state.newPassword,
                email: '',
            
            }
        })
    };

   

    render(){
        return(
            <div>
                <h1>Enter Email to reset password</h1>
                 <TextField
                    id="emailInput"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    onChange={this.handleChangeFor("email")}
                    value={this.state.newPassword.email}
                 />
                <br />
                <Button variant="outlined" onClick={() => this.sendEmail()}>
                    Send Student Email
                </Button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ForgotPasswordModal);
