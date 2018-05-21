import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../Nav/Nav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';



const mapStateToProps = state => ({
  user: state.user,
});

class NewProgramPage extends Component {
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

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
          <div className="managementNav">
          <ul>
            <li>
              <Link to="/user">
                All Programs
              </Link>
            </li>
            <li>
              <Link to="/manageAccounts">
                Manage Accounts
              </Link>
            </li>
            <li>
              <Link to="/newProgram">
                Create New Program
              </Link>
            </li>
          </ul>
          </div>

          <h1>
             New Program
          </h1>
          Name of Program <br/>
          <input placeholder="Name of Program"></input><br/>
          Description <br/>
          <input placeholder="Description"></input><br/>
          Start Date <br/>
          <input placeholder="mm/dd/yyyy"></input><br/>
          End Date <br/>
          <input placeholder="mm/dd/yyyy"></input><br/>
          Number of Weeks <br/>
          <input placeholder="Number of weeks"></input>
          <button>Create Program</button>
        
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewProgramPage);