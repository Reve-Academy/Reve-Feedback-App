// react, redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddFocusForm from './AddFocusForm';

//import component
import WeekItem from './WeekItem'

//library import
import RGL, { WidthProvider } from 'react-grid-layout';

//material-ui imports
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InstructorNav from '../../Nav/InstructorNav';
import { USER_ACTIONS } from '../../../redux/actions/userActions';

//css import
import './instructorSchedule.css';

const ReactGridLayout = WidthProvider(RGL);

const mapStateToProps = state => ({
  user: state.user,
  state
});

const itemStyle = ({
  centerContent: {
    display: 'flex', 
    justifyContent: 'center'
  },
  btn: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
    margin: '10px',
    maxHeight: '36px',    
  },
  editBtn: {
    borderRadius: '15px',
    border: '1px solid #D4D4D4',
    margin: '15px',
    maxHeight: '36px',  
    color: 'black', 
  },
  weekBtn: {
    border: '1px solid #D4D4D4',
    borderRadius: '50%',
    minWidth: '36px',
    maxWidth: '37px',
    margin: '5px',
  }
})

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
    borderRadius: 25,
    border: '2px solid #595959',
    outline: 'none',    
  },
});
//end styling properties 

class InstructorSchedulePage extends Component {
  static defaultProps = {
    className: "layout",
    items: 50,
    cols: 5,
    rowHeight: 50,
    maxRows: 6,
    width: '100%',
    onLayoutChange: function(){},
    // This turns off compaction so you can place items wherever.
    compactType: null
  };

  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    this.state = {
      open: false,
      layout: []
    }
  }

  //function for changing layout
  onLayoutChange = (newLayout) => {  
    this.props.onLayoutChange(newLayout);
    this.setState({
      ...this.state,
      layout: newLayout
    })
    console.log('newLayout: ', newLayout);
  }

  //function for dispatching to newlayout to database
  finalSchedule = () => {
    this.props.dispatch({
      type: 'ADD_SCHEDULE',
      payload: {
        schedule: {
          focus: this.props.state.scheduleReducer.focusReducer,
          layout: this.state.layout
        },
        week: this.props.state.scheduleReducer.thisWeekReducer 
      }
    })
  }

  //on click of new user button, open modal
  handleCreateLessonModal = () => {
    this.setState({ open: true });
  };

  //on click of outside modal, close modal
  handleClose = () => {
    this.setState({ open: false });
  };

  testRun = () => {
    console.log('HELLO');
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({
      type: 'FETCH_PROGRAM_WEEKS',
      payload: this.props.match.params
    });
    this.props.dispatch({
      type: 'FETCH_FOCUS_INFO'
    });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }


  render() {
    
    let content = null;

    const { classes } = this.props;

    //map for displaying weeks buttons
    let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
      return (<WeekItem key={week.id} week={week}/>)
    })

    //map for getting schedule items from reducer
    //KEY IS SUPER IMPORTANT, MUST MATCH i IN SCHEDULE LAYOUT
    let scheduleItem = this.props.state.scheduleReducer.focusReducer.map((item) => {
      return (
        <div key={item.newFocus.ID} className="ian">
          <span className="text">{item.newFocus.name}</span>
        </div>
      );
    })

    //map for placing schedule items on grid list
    let scheduleLayout = this.props.state.scheduleReducer.focusReducer.map((item, i) => {
      return {
        x: item.newFocus.x,
        y: item.newFocus.y,
        w: item.newFocus.w,
        h: item.newFocus.h,
        i: item.newFocus.ID.toString()
      };
    })

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
        
        


          <h1 className="ManageTitle">
            SCHEDULE
          </h1>
          <div style={itemStyle.centerContent}>{weekList}</div>
          <div style={itemStyle.centerContent}>
            <h2 className="ManageTitle">
              WEEK #
            </h2>
          </div>
          <div style={itemStyle.centerContent}>
            <h2 className="ManageTitle">
              <strong>Theme of This Week Name</strong>
            </h2>
            <Button style={itemStyle.editBtn} variant="outlined" color="primary">Edit Week</Button>
          </div>
          <div>
            <Modal
            aria-labelledby="Add New Focus"
            open={this.state.open}
            onClose={this.handleClose}
            >
            <div style={getModalStyle()} className={classes.paper}>
              <AddFocusForm />
            </div>
            </Modal>
          </div>

          {/* Schedule Container */}
          <div style={{backgroundColor: "#D4D4D4", height: '400px'}}>
            <table id="scheduleTable">
            <thead>
              <tr id="tableHeader">
                <th style={{width: '20%'}}>Monday</th>
                <th style={{width: '20%'}}>Tueday</th>
                <th style={{width: '20%'}}>Wednesday</th>
                <th style={{width: '20%'}}>Thursday</th>
                <th style={{width: '20%'}}>Friday</th>
              </tr>
            </thead>
            </table>
            <ReactGridLayout
              layout={scheduleLayout}
              onDragStop={this.onLayoutChange}
              onResizeStop={this.onLayoutChange}
              {...this.props}
            >
              {scheduleItem}
            </ReactGridLayout>
          </div>
          {/* End Schedule Container */}
          <div  style={itemStyle.centerContent}>
            <Button style={itemStyle.btn} variant="outlined" color="primary" onClick={this.handleCreateLessonModal}>Add Lesson</Button><br />
            <Button style={itemStyle.btn} variant="outlined" color="primary" onClick={() => this.finalSchedule()}>Finalize Schedule</Button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <InstructorNav program_id={this.props.match.params.program_id} program_name={this.props.match.params.program_name} />
        {content}
      </div>
    );
  }
}


const InstructorScheduleWithStyles = withStyles(styles)(InstructorSchedulePage)

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorScheduleWithStyles);