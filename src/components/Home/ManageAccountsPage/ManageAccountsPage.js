import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddNewUserModalForm from '../ManageAccountsPage/AddStudentForm';
import AccountsList from './AccountsList';
import Home_AllProgramsPage from '../NewProgramPage/NewProgramPage'
import NewProgramPage from '../NewProgramPage/NewProgramPage'

import Nav from '../../Nav/Nav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';



function getModalStyle() {
  const top = 50;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

class ManageAccountsPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false 
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleCreateUserModal = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {

    const { classes } = this.props;

    let content = null;

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
         <div>
            <ul>
            <li>
                <Link to="/newProgram" >
                  New Program
                </Link>
              </li>
            
              <li>
                <Link to="/manageAccounts" >
                  Manage Accounts
                </Link>
              </li>
              <li>
                <Link to="/user" >
                  All Programs
                </Link>
              </li>
            
            </ul>
          </div>

          <h1>
            Manage Accounts
          </h1>
          <button onClick={this.handleCreateUserModal}>Create User</button><br/>


          <div>
      
        <Modal
          aria-labelledby="Add New User"
          open={this.state.open}
          onClose={this.handleClose}
        > 
          <div style={getModalStyle()} className={classes.paper}>
            <AddNewUserModalForm />
          </div>
        </Modal>
      </div>

          {/* STRETCH GOAL
          <input placeholder="Search and Add User"></input><button>Search</button> */}

          <table>
            <thead>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Admin</th>
              <th>Active</th>
              <th>Program</th>
              <th>Delete</th>
            </thead>
            <tbody>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tbody>
          </table>
        
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}
 let manageAccountWithStyle = withStyles(styles)(ManageAccountsPage)
// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(manageAccountWithStyle);