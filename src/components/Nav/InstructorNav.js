import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '.././AvatarIcon/Avatar';
import avatarLogo from '../../styles/images/avatar.png';


class InstructorNav extends Component {

	// FUNCTION FOR PROGRAM NAVIGATION
	// navInstructor = () => {
	// 	this.props.history.push(v)
	// }

	render(){
		let instructorSchedulePath = `/InstructorSchedule/${this.props.program_id}`;
		let instructorFeedbackPath = `/InstructorFeedback/${this.props.program_id}`;
		let instructorStudentPath = `/InstructorStudent/${this.props.program_id}`;

		return (
		<div className="navbar" id="active">


			{/* Reve Academy logo for nav bar */}


			<ul clasName="active">
				<li className="avatar">
				{/* Avatar icon on right side for teacher */}
					 <Avatar /> 
				</li>

				<li onClick={this.navInstructor} className="navItem">
					<Link to={instructorStudentPath}>Student</Link>
				</li>
				<li className="navItem">
					<Link to={instructorFeedbackPath}>Feedback</Link>
				</li>
				<li className="navItem">
					<Link to={instructorSchedulePath}>Schedule</Link>
				</li>
				{/* //not link to new page, display current program */}
				<li className="navItem">
					<Link to="newProgram">Program Name</Link>
				</li>
				<li className="navItem">
					<Link to="/user">Home</Link>
				</li>
			</ul>
		</div>
	);
	}

}

const routerInstructorNav = withRouter(InstructorNav)

export default routerInstructorNav;
