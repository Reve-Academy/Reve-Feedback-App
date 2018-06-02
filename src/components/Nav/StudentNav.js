import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Avatar, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  user: state.user,
  state
});

class StudentNav extends Component {

  state = {
		anchorEl: null,
  };
  
  componentDidMount() {
    this.props.dispatch({ 
      type: 'GET_PROGRAM_INFO',
      payload: this.props.program_id
    });
  }

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
		let studentSchedulePath = `/StudentSchedule/${this.props.program_id}`;
    let studentFeedbackPath = `/StudentFeedback/${this.props.program_id}`;

		const { anchorEl } = this.state;    

    return(
    <div className="navbar">
  
      {/* Reve Academy logo */}
      <a href="/user"> <img className="logo" src={reveLogo} alt="Reve logo" /> </a>
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

      <ul>
        <li className="navItem">
          <Link to={studentFeedbackPath}>
            Feedback
          </Link>
        </li>
        <li className="navItem">
          <Link to={studentSchedulePath}>
            Schedule
          </Link>
        </li>
        <li>
          <Link className="programName" to={studentFeedbackPath}>
            {this.props.state.studentProgramReducer.studentProgramReducer.name}
          </Link>
        </li>
      </ul>
    </div>
  )}
}

const routerStudentNav = withRouter(StudentNav)

export default connect(mapStateToProps)(routerStudentNav);
