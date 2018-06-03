import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
//import avatarLogo from '../../styles/images/avatar.png';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import Button from '@material-ui/core/Button';
//import { Avatar, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class InstructorNav extends Component {

	// FUNCTION FOR PROGRAM NAVIGATION
	// navInstructor = () => {
	// 	this.props.history.push(v)
	// }

	state = {
		anchorEl: null,
	};
	
	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	
	handleClose = () => {
		this.setState({ anchorEl: null });
	};


	logout = () => {
		this.props.dispatch(triggerLogout());
		this.props.history.push('/home');
	}

	render(){
		let instructorSchedulePath = `/InstructorSchedule/${this.props.program_id}/${this.props.program_name}`;
		let instructorFeedbackPath = `/InstructorFeedback/${this.props.program_id}/${this.props.program_name}`;
		let instructorStudentPath = `/InstructorStudent/${this.props.program_id}/${this.props.program_name}`;
		
		const { anchorEl } = this.state;
		
		return (
		<div className="navbar" id="active">


			{/* Reve Academy logo for nav bar */}
			
			
			
			<a href="/user"> <img className="logo" src={reveLogo} alt="Reve logo"  /> </a>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={this.handleClose}
			>
				<MenuItem onClick={this.logout}>Logout</MenuItem>
			</Menu>
			<div>
				<AccountCircle 
				aria-owns={anchorEl ? 'simple-menu' : null}
				aria-haspopup="true"
				onClick={this.handleClick}
				variant="fab"
				color="primary"
				className="avatar"
				style={{height: '60px', width: '60px'}}/>
			</div>

			<ul className="active">
				<li className="avatar">
				{/* Avatar icon on right side for teacher */}
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
				<li className="navItem">
					<Link to="/user">Home</Link>
				</li>
				{/* //not link to new page, display current program */}
				<li>
					<Link className="programName" to={instructorSchedulePath}>{this.props.match.params.program_name}</Link>
				</li>
			</ul>
		</div>
	);
	}

}

const routerInstructorNav = withRouter(InstructorNav)

export default connect(mapStateToProps)(routerInstructorNav);
