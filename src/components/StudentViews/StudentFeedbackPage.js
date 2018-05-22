import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentNav from '../../components/Nav/StudentNav';

import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = (state) => ({
	user: state.user
});

class StudentFeedbackPage extends Component {
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

					<h1>STUDENT FEEDBACK</h1>

					{/* Feedback Container */}
					<div>This is where feedback will be sourced in.</div>
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
