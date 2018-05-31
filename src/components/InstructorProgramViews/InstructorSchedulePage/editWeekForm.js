import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
    },
    centerContent: {
        display: 'flex', 
        justifyContent: 'center'
    },
    editBtn: {
        borderRadius: '15px',
        border: '1px solid #D4D4D4',
        margin: '15px',
        maxHeight: '36px',  
        color: 'black', 
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
    // Sample state will be used to file and update existing week data
    //   editProgram: {
    //       id: this.props.pItem.id,
    //       name: this.props.pItem.name,
    //       active_program: this.props.pItem.active_program,
    //       description: this.props.pItem.description,
    //       start: this.props.pItem.start,
    //       finish: this.props.pItem.finish
    //   }
    }
  }

  handleEditWeek = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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

    const { classes } = this.props;    

    return(
        <div>
            
            <Button style={itemStyle.editBtn} onClick={this.handleEditWeek} variant="outlined" color="primary">Edit Week</Button>
            
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
                    Stuff
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