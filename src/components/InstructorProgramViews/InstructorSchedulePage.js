import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Home_AllProgramsPage from '../../components/Home/Home_AllProgramsPage'
import Nav from '../../components/Nav/Nav';

import { USER_ACTIONS } from '../../redux/actions/userActions';



const mapStateToProps = state => ({
  user: state.user,
});

class InstructorSchedulePage extends Component {
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
              <Link to="/InstructorStudent">
                Students
              </Link>
            </li>
            <li>
              <Link to="/InstructorFeedback">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/InstructorSchedule">
                Schedule
              </Link>
            </li>
      
          </ul>
          </div>

          <h1>
            INSTRUCTOR SCHEDULE PAGE
          </h1>
        
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
export default connect(mapStateToProps)(InstructorSchedulePage);