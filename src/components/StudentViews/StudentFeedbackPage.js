import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';
import Button from '@material-ui/core/Button';
import CommentsItem from './StudentFeedbackItem';
//import WeekItem from './StudentFeedbackItem';
import DayItem from './DayItem';
//css import
import './studentFeedback.css'
import { USER_ACTIONS } from '../../redux/actions/userActions';
import Grid from '@material-ui/core/Grid';
//import studentWeekInfoReducer from '../../redux/reducers/studentWeekInfoReducer';
let moment = require('moment');

const mapStateToProps = (state) => ({
	user: state.user,
	state
});


const itemStyle = ({
	centerContent: {
		display: 'flex',
		justifyContent: 'center',
	},
	columnComments: {
		display: 'flex',
		flexDirection: 'column',
	},
	btn: {
		borderRadius: '15px',
		border: '1px solid #D8441C',
		margin: '10px',
		maxHeight: '36px',
	},
	commentArea: {
		borderRadius: '15px',
		border: '1px solid #D8441C',
		fontSize: '25px',
		width: '400px',
		height: '100px',
		outline: 'none',
	}
})

class StudentFeedbackPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newComment: ''
		};
	}

	handleComment = (event) => {
		this.setState({
			newComment: event.target.value
		});
	};
	//ADD COMMENT TO SERVER
	postComment = () => {
		if (this.state.newComment === '') {
			return;
		} else {
			this.props.dispatch({
				type: 'ADD_STUDENT_COMMENT',
				payload: {
					newComment: this.state.newComment,
					date: moment().format("MM DD YYYY"),
					week: this.props.state.instructorFeedBackReducer.weekIdReducer
				}
			});
			this.setState({
				newComment: ''
			});
		}
	};


	//GET LIKE AND COMMENT INFO FROM SERVER TO DOM
	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENT' });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENT_LIKE' });
		this.props.dispatch({
			type: 'FETCH_PROGRAM_WEEKS',
			payload: this.props.match.params
		})
		this.props.dispatch({
			type: 'GET_FIRST_COMMENT',
			payload: this.props.match.params.program_id
		});
	}

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('/home');
		}
	}

	render() {
		let content = null;
		let weekTheme = this.props.state.scheduleReducer.weekThemeReducer.weekTheme
		let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
			return (<DayItem key={week.id} week={week} />)
		})

		// console.log('instructor placement', this.props.state.studentCommentReducer.studentCommentReducer	)
		let theComments = this.props.state.instructorFeedBackReducer.allCommentsReducer.map((comments, i) => {
			return (
				<CommentsItem
					key={i}
					comments={comments}
					commentsLiked={this.props.state.studentLikeReducer.studentLikeReducer}
				/>
			);
		});
		// let weekInfo = this.props.state.studentWeekInfoReducer.studentWeekInfoReducer.map((week) => {
		// 	return <DayItem key={week.id} week={week} />;
		// });

		if (this.props.user.userName && this.props.user.userName.instructor === false) {
			content = (
				<div>
					<p style={{fontSize: '20px', color: '#D8441C'}}  className="ManageTitle">
						WEEK {this.props.state.instructorFeedBackReducer.weekNumberReducer}
					</p>
		

					<div style={itemStyle.centerContent}>{weekList}</div>
					
					<h2 className="ManageTitle">
						<strong className="themeTitle">{weekTheme}</strong>
					</h2>
					<div>
						<p className="ManageTitle">{this.props.state.scheduleReducer.weekDescriptionReducer.weekDescription}</p>
					</div>
					<br/>

					<div style={itemStyle.centerContent}>
						{/* {TEXT AREA} */}
						<textarea
							style={itemStyle.commentArea}
							value={this.state.newComment}
							onChange={this.handleComment}
						/>
					</div>
					{/* END TEXT AREA */}
					<div style={itemStyle.centerContent}>
						<Button style={itemStyle.btn} onClick={this.postComment}>
							SEND
						</Button>
					</div>
					{/* {studentComments} */}
					<Grid container  >
						{theComments}
					</Grid>
					{/* End Feedback Container */}
				</div>
			);
		}

		return (
			<div>
				<StudentNav
					program_id={this.props.match.params.program_id}
				/>
				{content}
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentFeedbackPage);
