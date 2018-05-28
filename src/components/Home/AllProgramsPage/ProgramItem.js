import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import EditProgramForm from './EditProgramForm';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
  }
})

const mapStateToProps = state => ({
  state,
});

class ProgramItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      editProgram: {
          id: this.props.pItem.id,
          name: this.props.pItem.name,
          active_program: this.props.pItem.active_program,
          description: this.props.pItem.description,
          start: this.props.pItem.start,
          finish: this.props.pItem.finish
      }
    }
  }

  handleEditProgram = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // FUNCTION FOR DISPATCHING ACTION TO PUT PROGRAM
  putProgram = () => {
    this.props.dispatch({
      type: 'UPDATE_PROGRAM_SAGA',
      payload: this.state.editProgram
    })
  };

  // FUNCTION FOR PROGRAM NAVIGATION
  navProgram = () => {
    this.props.history.push(`/InstructorSchedule/${this.props.pItem.id}`)
  }

  // FUNCTION FOR DISPATCHING ACTION TO PUT PROGRAM ACTIVE
  programActive = () => {
    this.props.dispatch({
      type: 'UPDATE_PROGRAM_ACTIVE',
      payload: this.state.editProgram
    })
  };

  render() {

    // Activation Button
    let programActiveSetting;
    if (this.props.pItem.active_program === true ) {
       programActiveSetting = (<Button variant="outlined" style={itemStyle.btn} onClick={() => this.programActive()}>
          Deactivate
       </Button>)
    } else {
       programActiveSetting = (<Button variant="outlined" style={itemStyle.btn} onClick={() => this.programActive()}>
          Activate
       </Button>)
    }
    // End Activation Button

    const { classes } = this.props;    

    return(
      <div>

        {/* Card Container */}
        <Card style={itemStyle.reveCard}>
          <CardContent>
            <Typography 
              variant="headline" 
              component="h2"
              >
              {this.props.pItem.name}
            </Typography>
            <Typography component="p">
              {this.props.pItem.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button  
              onClick={this.navProgram} 
              variant="raised" 
              style={{borderRadius: "15px"}}
              >
              Program
            </Button>
            <Button 
              onClick={this.handleEditProgram}
              variant="outlined"
              style={itemStyle.btn}
              >
              Edit
            </Button>
            {programActiveSetting}
          </CardActions>
        </Card>
        {/* End Card Container */}

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
            <EditProgramForm 
              pItem={this.props.pItem}
            />
          </div>
        </Modal>
        {/* End Modal Edit */}

      </div>
    )
  }
}

let programItemStyle = withStyles(styles)(ProgramItem)
let programWithRouter = withRouter(programItemStyle)
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(programWithRouter);