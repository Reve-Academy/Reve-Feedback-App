import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ProgramItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false 
    }
  }

  handleEditProgram = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    const { classes } = this.props;    

    return(
      <div>

        {/* Card Container */}
        <Card>
          <CardContent>
            <Typography variant="headline" component="h2">
              {this.props.pItem.name}
            </Typography>
            <Typography component="p">
              Description to be filled
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={this.handleEditProgram}>
              Edit
            </Button>
          </CardActions>
        </Card>
        {/* End Card Container */}

        {/* Modal Edit */}
        <Modal
          aria-labelledby="Edit Program"
          open={this.state.open}
          onClose={this.handleClose}
          > 
          <div style={getModalStyle()} className={classes.paper}>
            <EditProgramForm pItem={this.props.pItem}/>
          </div>
        </Modal>
        {/* End Modal Edit */}

      </div>
    )
  }
}

let programItemStyle = withStyles(styles)(ProgramItem)
// this allows us to use <App /> in index.js
export default programItemStyle;