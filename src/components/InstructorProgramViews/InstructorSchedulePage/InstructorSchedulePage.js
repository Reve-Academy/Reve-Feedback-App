// react, redux imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddFocusForm from './AddFocusForm';
import EditWeekForm from './editWeekForm';

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
  },
  removeStyle: {
    position: "absolute",
    right: "2px",
    top: 0,
    cursor: "pointer"
  },


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
    rowHeight: 70,
    maxRows: 5,
    width: '85%',
    onLayoutChange: function(){},
    // This turns off compaction so you can place items wherever.
    compactType: null,
    preventCollision: true
  };

  constructor(props) {
    super(props);

    // const layout = this.generateLayout();
    this.state = {
      focusOpen: false,
      infoOpen: false,
      layout: []
    }
  }

  //function for changing layout
  onLayoutChange = (newLayout) => {
    this.props.onLayoutChange(newLayout);
    this.props.dispatch({
      type: 'UPDATE_SCHEDULE',
      payload: {
        layout: newLayout
      }
    })
    console.log('newLayout: ', newLayout);
  }

  onRemoveFocus = (item) => {
    this.props.dispatch({
      type: 'DELETE_FOCUS',
      payload: item
    })
  };

  //on click of new user button, open modal
  handleCreateFocusModal = () => {
    this.setState({ focusOpen: true });
  };

  //on click of outside modal, close modal
  handleCloseFocus = () => {
    this.setState({ focusOpen: false });
  };

  //on click of new user button, open modal
  handleInfoModal = (focus) => {
    this.setState({ infoOpen: true });
    this.props.dispatch({
      type: 'GET_INFO',
      payload: focus
    })
  };

  //on click of outside modal, close modal
  handleCloseInfo = () => {
    this.setState({ infoOpen: false });
  };

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

    let weekNumber = this.props.state.scheduleReducer.weekNumberReducer.weekNumber
    console.log('hello this is weekNumber: ', weekNumber );

    let weekTheme = this.props.state.scheduleReducer.weekThemeReducer.weekTheme

    let weekDescription = this.props.state.scheduleReducer.weekDescriptionReducer.weekDescription


    //map for displaying weeks buttons
    let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
      return (<WeekItem key={week.id} week={week} />)
    })



    //set redux state equal to variable
    let allFocus = this.props.state.scheduleReducer.focusReducer;
    //filter so that only correct focus are on DOM
    let focusList = allFocus.filter(focus => focus.week_id === this.props.state.scheduleReducer.thisWeekReducer.weekId);

    //map for getting filtered schedule items from reducer
    //KEY IS SUPER IMPORTANT, MUST MATCH i IN SCHEDULE LAYOUT
    let scheduleItem = focusList.map((item) => {
      return (
        <div key={item.f_id} className="ian">
          <span
            style={itemStyle.removeStyle}
            onClick={() => this.onRemoveFocus({ item })}
          >
            x
          </span>
          <span className="text">{item.name}</span>
          <br />
          <Button color="primary" onClick={() => this.handleInfoModal({ item })}>View Info</Button>
        </div>
      );
    })

    //map for placing schedule items on grid list
    let scheduleLayout = focusList.map((item, i) => {
      return {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        i: item.f_id.toString()
      };
    })

    let focusInfo = this.props.state.scheduleReducer.viewFocusInfo.map((info) => {
      return (<div key={info.id}>
        <h3 style={{fontFamily: 'lato'}}>Strategy:</h3>
        <p>{info.title}</p>
        <h3 style={{fontFamily: 'lato'}}>Resources</h3>
        <p>{info.link}</p>
      </div>)
    })

    //let themeWeekId = this.props.state.scheduleReducer.thisWeekReducer.weekId;
    //let weekThemeItems = this.props.state.scheduleReducer.weekReducer.filter(function(element) {
    // return (element.id === themeWeekId);
    //});

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>

          <p style={{ fontSize: '20px', color: '#D8441C' }} className="ManageTitle">
            WEEK {weekNumber}
          </p>
          <div style={itemStyle.centerContent}>{weekList}</div>
          <p className="ManageTitle" style={{ fontSize: '30px' }}><strong className="themeTitle">{weekTheme}</strong></p>
          <p style={{ padding: '0px' }} className="ManageTitle">{weekDescription}</p><br/>
          <EditWeekForm program_id={this.props.match.params.program_id} />
          <br/>
          {/* Modals */}
          <div>
            <Modal
              aria-labelledby="Add New Focus"
              open={this.state.focusOpen}
              onClose={this.handleCloseFocus}
            >
            <div style={getModalStyle()} className={classes.paper}>
              <AddFocusForm 
            handleCloseFocus={this.handleCloseFocus} />
            </div>
            </Modal>
          </div>

          <div>
            <Modal
              aria-labelledby="Focus Info"
              open={this.state.infoOpen}
              onClose={this.handleCloseInfo}
            >
              <div style={getModalStyle()} className={classes.paper}>
                {focusInfo}
              </div>
            </Modal>
          </div>
          {/* end of modals */}
          {/* Schedule Container */}
          <div style={{ height: '400px'}}>
            <div style={itemStyle.centerContent}>
            <table id="scheduleTable">
              <thead>
                <tr id="tableHeader">
                  <th style={{fontFamily: 'lato', width: '20%' }}>Monday</th>
                  <th style={{fontFamily: 'lato', width: '20%' }}>Tuesday</th>
                  <th style={{fontFamily: 'lato', width: '20%' }}>Wednesday</th>
                  <th style={{fontFamily: 'lato', width: '20%' }}>Thursday</th>
                  <th style={{fontFamily: 'lato', width: '20%' }}>Friday</th>
                </tr>
              </thead>
            </table>
            </div>
            <div style={itemStyle.centerContent}>
            <ReactGridLayout
              style={{width: '85%'}}
              layout={scheduleLayout}
              onDragStop={this.onLayoutChange}
              onResizeStop={this.onLayoutChange}
              {...this.props}
            >
              {scheduleItem}
            </ReactGridLayout>
            </div>
          </div>
          {/* End Schedule Container */}
          <br/>
          <br/>
          <div style={itemStyle.centerContent}>
            <Button style={itemStyle.btn} variant="outlined" color="primary" onClick={this.handleCreateFocusModal}>Add Focus</Button>
          </div>
          <div style={{height: '60px'}}>
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