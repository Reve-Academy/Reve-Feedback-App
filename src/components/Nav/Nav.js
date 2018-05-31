import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Avatar, IconButton } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { triggerLogout } from '../../redux/actions/loginActions';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import reveLogo from '../../styles/images/ReveAcademy_Logo.png'

const mapStateToProps = state => ({
  user: state.user,
  state
});

class Nav extends Component {

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

    const { anchorEl } = this.state;

    return (
      <div className="navbar">
        
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
        <ul>

          <li>
            
            <Link to="/user">
              Home
            </Link>
            
          </li>
        </ul>
      </div>
    )}
}


const routerNav = withRouter(Nav)

export default connect(mapStateToProps)(routerNav);
