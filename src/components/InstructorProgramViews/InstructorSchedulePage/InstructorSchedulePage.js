// react, redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddFocusForm from './AddFocusForm';

//library import
import RGL, { WidthProvider } from 'react-grid-layout';
import _ from 'lodash';

//material-ui imports
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InstructorNav from '../../Nav/InstructorNav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
  state
});

//Style properties for add new user modal
function getModalStyle() {
  const top = 50;
  const left = 50;

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
//end styling properties 

class InstructorSchedulePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  //on click of new user button, open modal
  handleCreateLessonModal = () => {
    this.setState({ open: true });
  };

  //on click of outside modal, close modal
  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'FETCH_PROGRAM_WEEKS',
      payload: this.props.match.params
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }


  render() {
    
    let content = null;

    const { classes } = this.props;

    let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
      return (<Button variant="fab" color="primary" key={week.id}>{week.number} </Button>)
    })

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
        
        


          <h1>
            INSTRUCTOR SCHEDULE PAGE
          </h1>
          <div>{weekList}</div>
          <Button variant="outlined" color="primary" onClick={this.handleCreateLessonModal}>Add Lesson</Button><br />

          <div>
            <Modal
            aria-labelledby="Add New User"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={getModalStyle()} className={classes.paper}>
              <AddFocusForm />
            </div>
            </Modal>
          </div>

          {/* Schedule Container */}

          {/* End Schedule Container */}

        </div>
      );
    }

    return (
      <div>
        <InstructorNav program_id={this.props.match.params.program_id}/>
        {content}
      </div>
    );
  }
}

const InstructorScheduleWithStyles = withStyles(styles)(InstructorSchedulePage)

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorScheduleWithStyles);