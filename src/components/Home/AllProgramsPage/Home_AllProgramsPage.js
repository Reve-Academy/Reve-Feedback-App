import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../Nav/Nav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class Home_AllProgramsPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  //on logout, go to login page
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {

    console.log('ADMIN TEST!', this.props.user)

    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <div className="managementNav">
          <ul>
            <li>
              <Link to="/user" >
                All Programs
              </Link>
            </li>
            <li>
              <Link to="/manageAccounts" >
                Manage Accounts
              </Link>
            </li>
            <li>
              <Link to="/newProgram" >
                New Program
              </Link>
            </li>
          </ul>
          </div>

          <h1>
            THIS IS THE ALL/MANGE PROGRAMS VIEW
          </h1>
          <button
            onClick={this.logout}
          >
            Log Out
          </button>
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
export default connect(mapStateToProps)(Home_AllProgramsPage);



