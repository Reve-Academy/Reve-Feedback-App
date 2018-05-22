import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../Nav/Nav';
import ProgramsList from './ProgramsList';
import ManageAccountsPage from '../../Home/ManageAccountsPage/ManageAccountsPage';
import NewProgramPage from '../../Home/NewProgramPage/NewProgramPage';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';



const mapStateToProps = state => ({
  user: state.user,
  state
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
    this.props.history.push('home');
  }

  render() {
    
    
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

          {/* Content Container */}
          <div>
            <h1>
              THIS IS THE ALL/MANGE PROGRAMS VIEW
            </h1>

            {/* Programs List */}
            <div>
              <ProgramsList />
            </div>
            {/* End Programs List */}

            <button
              onClick={this.logout}
            >
              Log Out
            </button>
            </div>
          {/* End Content Container */}

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
