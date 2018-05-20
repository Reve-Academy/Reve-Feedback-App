import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ManageAccountsPage from '../Home/ManageAccountsPage';
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';



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

    if (this.props.user.userName) {
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
                New Program
              </Link>
            </li>
          </ul>
          </div>

          <h1>
            THIS IS THE PAGE TO CREATE A NEW PROGRAM
          </h1>
          <p>2018 Summer session</p>
        
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