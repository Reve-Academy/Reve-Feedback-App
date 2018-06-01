import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';

//library import
import RGL, { WidthProvider } from 'react-grid-layout';

//material-ui imports
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const ReactGridLayout = WidthProvider(RGL);

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
	}
  })

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

class StudentSchedulePage extends Component {
	static defaultProps = {
		className: "layout",
		items: 50,
		cols: 5,
		rowHeight: 50,
		maxRows: 6,
		width: '100%',
		onLayoutChange: function(){},
		// This turns off compaction so you can place items wherever.
		compactType: null,
		preventCollision: true
	  };
	
	constructor(props) {
		super(props);
	
		// const layout = this.generateLayout();
		this.state = {
		  infoOpen: false,
		}
	}

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
	}

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	}

	render() {
		let content = null;

		const { classes } = this.props;

		if (this.props.user.userName && this.props.user.userName.instructor === false) {
			content = (
				<div>
						<ul>

							<li>
								<Link to="/StudentFeedback">Feedback</Link>
							</li>
							<li>
								<Link to="/StudentSchedule">Schedule</Link>
							</li>
						</ul>
					

					<h1>STUDENT SCHEDULE</h1>
					{/* MODAL FOR INFO */}
					<div>
            		<Modal
            			aria-labelledby="Focus Info"
            			open={this.state.infoOpen}
            			onClose={this.handleCloseInfo}
            		>
            			<div style={getModalStyle()} className={classes.paper}>
              			<p>Hello</p>
            			</div>
            		</Modal>
         			</div>

					<div>
					<table id="scheduleTable">
            			<thead>
              				<tr id="tableHeader">
                				<th style={{width: '20%'}}>Monday</th>
                				<th style={{width: '20%'}}>Tuesday</th>
                				<th style={{width: '20%'}}>Wednesday</th>
                				<th style={{width: '20%'}}>Thursday</th>
                				<th style={{width: '20%'}}>Friday</th>
              				</tr>
            			</thead>
            		</table>
					<ReactGridLayout
              		// layout={}
					isDraggable={false}
					isResizable={false}
              		{...this.props}
            		>
              			<p>Hi</p>
            		</ReactGridLayout>
					</div>
				</div>
			);
		}

		return (
			<div>
				<StudentNav />
				{content}
			</div>
		);
	}
}

const StudentScheduleWithStyles = withStyles(styles)(StudentSchedulePage)

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentScheduleWithStyles);
