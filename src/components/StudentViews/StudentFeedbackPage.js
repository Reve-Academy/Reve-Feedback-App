import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';
import Button from '@material-ui/core/Button';
import CommentsItem from './StudentFeedbackItem';
import WeekItem from './StudentFeedbackItem';
import DayItem from './DayItem';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import studentWeekInfoReducer from '../../redux/reducers/studentWeekInfoReducer';
let moment = require('moment');

const mapStateToProps = (state) => ({
	user: state.user,
	state
});

const itemStyle = {
	centerContent: {
		display: 'flex',
		justifyContent: 'center'
	},
	centerContent: {
		display: 'flex',
		flexDirection: 'column'
	},
	btn: {
		borderRadius: '15px',
		border: '1px solid #D8441C',
		margin: '10px',
		maxHeight: '36px'
	},
	commentArea: {
		borderRadius: '15px',
		border: '1px solid #D8441C',
		fontSize: '25px',
		width: '400px',
		height: '100px',
		outline: 'none'
	}
};

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

	postComment = () => {
		this.props.dispatch({
			type: 'ADD_STUDENT_COMMENT',
			payload: this.state.newComment,
			date: moment().format('MM DD YYY')
		});

		this.setState({
			newComment: ''
		});
	};

	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENT' });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENT_LIKE' });
	}

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	}

	render() {
		let content = null;

		let theComments = this.props.state.studentCommentReducer.studentCommentReducer.map((comments, i) => {
			return <CommentsItem key={i} comments={comments} commentsLiked={this.props.state.studentLikeReducer.studentLikeReducer} />;
		});
		let weekInfo = this.props.state.studentWeekInfoReducer.studentWeekInfoReducer.map((week) => {
			return <DayItem key={week.id} week={week} />;
		});
		
		if (this.props.user.userName && this.props.user.userName.instructor === false) {
			content = (
				<div>
					<h1 className="ManageTitle">STUDENT FEEDBACK</h1> <br />
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
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div style={itemStyle.centerContent}>
							{/* {studentComments} */}

							{theComments}
						</div>

						{/* {weekInfo} */}
					</div>
					{/* End Feedback Container */}
				</div>
			);
		}

		return (
			<div>
				<StudentNav
					program_id={this.props.match.params.program_id}
					program_name={this.props.match.params.program_name}
				/>
				{content}
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentFeedbackPage);
