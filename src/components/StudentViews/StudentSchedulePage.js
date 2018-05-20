import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import studentNav from '../../components/Nav/studentNav';




import { USER_ACTIONS } from '../../redux/actions/userActions';



const mapStateToProps = state => ({
  user: state.user,
});

class StudentSchedulePage extends Component {
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
              <Link to="/StudentFeedback">
                Feedback
              </Link>
            </li>
            <li>
              <Link to="/StudentSchedule">
                Schedule
              </Link>
            </li>
          </ul>
          </div>

          <h1>
            STUDENT SCHEDULE 
          </h1>
        
        </div>
      );
    }

    return (
      <div>
        <studentNav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(StudentSchedulePage);