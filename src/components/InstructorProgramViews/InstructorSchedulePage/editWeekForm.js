import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//import Card from '@material-ui/core/Card';
//import Grid from '@material-ui/core/Grid';
//import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        borderRadius: 25,
        border: '2px solid #595959',
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    centerEditBtn: {
        width: '100%',
        justifyContent: 'center'
      }
});

const itemStyle = ({
  reveCard: {
        padding: '10px',
        margin: '10px',
        border: '1px solid #D8441C',
        borderRadius: '25px',
    },
    btn: {
        borderRadius: '15px',
        border: '1px solid #D8441C',
    },
    centerContent: {
        display: 'flex', 
        justifyContent: 'center'
    },
    editBtn: {
        borderRadius: '15px',
        border: '1px solid #D4D4D4',
        marginBottom: '10px',
        maxHeight: '36px',  
        color: 'black', 
        display: 'flex', 
        justifyContent: 'center'
    },
})

const mapStateToProps = state => ({
  state,
});

class EditWeek extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            editWeek: {
                theme: '',
                description: '',
                program_id: this.props.program_id,
               
            }
        }
    }
    
    handleEditWeek = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    // this handles editing property of each input field. note onBlur is when this is fired
    handleChangeFor = propertyName => (event) => {
    this.setState({
        editWeek: {
            ...this.state.editWeek,
            [propertyName]: event.target.value,
            weekId: this.props.weekNumber,
        }
    })   
    }

    // FUNCTION FOR DISPATCHING ACTION TO PUT WEEK
    putWeek = () => {
        console.log('weekId', this.props.state.scheduleReducer);

        
        this.props.dispatch({
            type: 'UPDATE_WEEK_SAGA',
            payload: {
            updatedWeek: this.state.editWeek,
            weekId: this.props.state.scheduleReducer.thisWeekReducer.weekId,
            program_id: this.props.program_id
            }
        })
        this.handleClose()    
    };

// Sample dispatch will be used to update week
//  FUNCTION FOR DISPATCHING ACTION TO PUT PROGRAM
//   putProgram = () => {
//     this.props.dispatch({
//       type: 'UPDATE_PROGRAM_SAGA',
//       payload: this.state.editProgram
//     })
//   };


  render() {
    console.log('edit week form', this.props.program_id);
    
    const { classes } = this.props;    

    return(
        
        <div>
           <div style={itemStyle.centerContent}>
         
            <Button style={itemStyle.editBtn} onClick={this.handleEditWeek} variant="outlined" color="primary">Edit Week</Button>
            </div>
           
            {/* Modal Edit */}
            <Modal
            aria-labelledby="Edit Program"
            open={this.state.open}
            onClose={this.handleClose}
            > 
            
                <div 
                    style={getModalStyle()} 
                    className={classes.paper}
                >
                
                    <Typography variant="headline" component="h2">
                        Edit Week
                    </Typography>
                    {/* Program Name */}
                    <TextField
                        id="weekName"
                        // label={this.props.pItem.name}
                        placeholder="Week Title"
                        margin="normal"
                        // defaultValue={this.props.pItem.name}
                        onChange={this.handleChangeFor("theme")}
                    />
                    <br />
                    {/* Description of Program */}
                    <TextField
                        id="description"
                        label="Description"
                        placeholder="Description"
                        margin="normal"
                        // defaultValue={this.props.pItem.description}
                        onChange={this.handleChangeFor("description")}
                    />
                    <Button
                        onClick={this.putWeek}
                    >
                        Save
                    </Button>
                </div>
            </Modal>
            {/* End Modal Edit */}

        </div>
    )
  }
}

let editWeekStyle = withStyles(styles)(EditWeek)
let editWeekWithRouter = withRouter(editWeekStyle)
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(editWeekWithRouter);