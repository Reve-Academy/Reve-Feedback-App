import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '.././AvatarIcon/Avatar';

const InstructorNav = () => (
	<div className="navbar">
		<div>
			<ul>
				{/* Reve Academy logo for nav bar */}
				<li className="logo">
					<img src="images/academylogo_white.png" alt="Reve logo" />
				</li>

				<li>
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
	</div>
);

export default InstructorNav;
