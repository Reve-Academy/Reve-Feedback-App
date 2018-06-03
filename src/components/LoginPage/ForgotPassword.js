import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

//Recieve from Redux
const mapStateToProps = state => ({
    state,
  });

  const styles = theme => ({
    btn: {
      borderRadius: '15px',
      border: '1px solid #D8441C',
      marginTop: '10px',
      maxHeight: '36px',  
    },
  });



class ForgotPasswordModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPassword: {
            username: '', 
        
            }
        }
        }
    
    //Upadate input field with email
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


    // on CLICK, send email
    sendEmail = () => {
       
        this.props.dispatch({
            type: 'UPDATE_NEW_TOKEN',
            payload: this.state.newPassword
        })
        console.log('send email')
        this.setState({
            newPassword: {
                ...this.state.newPassword,
                username: '',
            
            }
        })
    };

   

    render(){
        const { classes } = this.props;
        return(
            <div>
                <h3 className="ManageTitle">Enter your email to reset password</h3>
                 <TextField
                    id="emailInput"
                  
                    placeholder="Email"
                    margin="normal"
                    onChange={this.handleChangeFor("username")}
                    value={this.state.newPassword.username}
                 />
                <br />
                <Button className={classes.btn} variant="outlined" color="primary" onClick={() => this.sendEmail()}>
                    Send Student Email
                </Button>
            </div>
        )
    }
}

let forgotPasswordModalWithStyle = withStyles(styles)(ForgotPasswordModal)
export default connect(mapStateToProps)(forgotPasswordModalWithStyle);