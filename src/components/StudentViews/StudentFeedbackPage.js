import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';
import Button from '@material-ui/core/Button';
import CommentsItem from './StudentFeedbackItem';
import DayItem from './DayItem';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = (state) => ({
	user: state.user,
	state,
});

class StudentFeedbackPage extends Component {
	
	constructor(props){
		super(props);
		this.state={
		  newComment:'',
		}
	  }

	handleComment = (event) => {
		this.setState({
			newComment: event.target.value
		})
	}
	
	postComment = () => {
		this.props.dispatch({
			type: 'ADD_COMMENT',
			payload: this.state
		})
		this.props.dispatch({
			type: 'GET_STUDENT_EXPENSE',
			payload: this.state
		});
		this.setState
	}
	
	
	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENT'});
	}


	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
		this.setState
		
	}

	render() {
		let content = null;
		
		  let theComments = this.props.state.studentCommentReducer.studentCommentReducer.map((comments)=>{
			return(<CommentsItem key={comments.id} comments={comments}/>)
		  })
		  
		if (this.props.user.userName && this.props.user.userName.instructor === false) {
			content = (
				<div>
						
					<h1>STUDENT FEEDBACK</h1> <br />
				

					{/* Feedback Container */}
					<textarea style={{fontSize:'25px'}} value={this.state.newComment} onChange={this.handleComment}></textarea>
            <button onClick={this.postComment}>SEND</button>
				
					{/* {studentComments} */}
					{theComments}
				
					{/* End Feedback Container */}
				</div>
			);
		}

		return (
			<div>
				<StudentNav program_id={this.props.match.params.program_id} program_name={this.props.match.params.program_name} />
				{content}
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentFeedbackPage);
