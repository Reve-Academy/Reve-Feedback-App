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


//Style properties for add new user modal
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius: 25,
    border: '2px solid #595959',
  };
}

//Style mini navigation 
const itemStyle = ({
  centerContent: {
    display: 'flex', 
    justifyContent: 'center'
  }
})

//Modal Styling
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  btn: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
    margin: '10px',
    maxHeight: '36px',  
  },
  centerContent: {
    display: 'flex', 
    justifyContent: 'center',
    marginBottom: '30px',
  },
  
});

//Recieve from Redux
const mapStateToProps = state => ({
  user: state.user,
});

class ManageAccountsPage extends Component {
  constructor(props) {
    super(props);
    //open state of modal begins as false
    this.state = {
      open: false
    }
  }
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  //on click of new user button, open modal
  handleCreateUserModal = () => {
    this.setState({ open: true });
  };

  //on click of outside modal, close modal
  handleClose = () => {
    this.setState({ open: false });
  };


  render() {

    const { classes } = this.props;

    let content = null;

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
          <div style={itemStyle.centerContent}>
            <ul>
              <li style={{border: '2px solid #a0a0a0', margin: '0px 0px 0px -2px'}}>
                <Link to="/newProgram" >
                  New Program
                </Link>
              </li>

              <li style={{border: '2px solid #a0a0a0'}}>
                <Link to="/manageAccounts" >
                  Manage Accounts
                </Link>
              </li>
              <li style={{border: '2px solid #a0a0a0', margin: '0px -2px 0px 0px'}}>
                <Link to="/user" >
                  All Programs
                </Link>
              </li>

            </ul>
          </div>

          <h1 className='ManageTitle'>
            MANAGE ACCOUNTS
          </h1>
          <div className={classes.centerContent}><Button className={classes.btn} variant="outlined" color="primary" onClick={this.handleCreateUserModal}>Create User</Button><br /></div>


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
            <AccountsList 
              

            />
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