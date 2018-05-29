import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';
import Button from '@material-ui/core/Button';
import CommentsItem from './StudentCommentsItem';

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
	
	
	
	
	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_STUDENT_COMMENTS'});
	}


	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	}

	render() {
		let content = null;

		// let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
		// 	return (<Button variant="fab" color="primary" key={week.id}>{week.number} </Button>)
		//   })

		  let studentComments = this.props.state.studentFeedbackSaga.allCommentsReducer.map((comments)=>{
			return(<CommentsItem key={comments.id} comments={comments}/>)
		  })

		if (this.props.user.userName && this.props.user.userName.student === false) {
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

					<h1>STUDENT FEEDBACK</h1>

					{/* Feedback Container */}
					<textarea style={{fontSize:'25px'}} value={this.state.newComment} onChange={this.handleComment}></textarea>
            <button onClick={this.addComment}>SEND</button>
				<div>
					{/* {studentComments} */}
				</div>
					{/* End Feedback Container */}
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentFeedbackPage);
