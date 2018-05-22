import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '.././AvatarIcon/Avatar';

const InstructorNav = () => (
	<div className="navbar">


		{/* Reve Academy logo for nav bar */}

		<img className="logo" src="images/academylogo_white.png" alt="Reve logo" />

		<ul>
			<li className="avatar">
				{/* Avatar icon on right side for teacher */}
				<Avatar />
			</li>

			<li className="navItem">
				<Link to="/InstructorStudent">Students</Link>
			</li>
			<li className="navItem">
				<Link to="/InstructorFeedback">Feedback</Link>
			</li>
			<li className="navItem">
				<Link to="/InstructorSchedule">Schedule</Link>
			</li>
			<li className="navItem">
				<Link to="newProgram">Program Name</Link>
			</li>
			<li className="navItem">
				<Link to="user">Home</Link>
			</li>
		</ul>
	</div>
);

export default InstructorNav;
