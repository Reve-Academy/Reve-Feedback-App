import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InstructorNav from '../../Nav/InstructorNav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import CommentItem from './StudentCommentItem';



const mapStateToProps = state => ({
  user: state.user,
  state,
});

class InstructorFeedbackPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ type: 'GET_COMMENTS'});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  render() {

    let content = null;
    let studentComment = this.props.state.instructorFeedBackReducer.allCommentsReducer.map((comment)=>{
      return(<CommentItem key={comment.id} comment={comment}/>)
    })

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>

          {/* client-side routes for navbar */}

          <div>
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
          {/* End navbar routes */}
        
          

          <h1>
            INSTRUCTOR FEEDBACK PAGE
          </h1>
        
          {/* Feedback Container */}


          <div>
            {studentComment}
          </div>
          {/* End Feedback Container */}

        </div>
      );
    }

    return (
      <div>
       <InstructorNav />
        {content}
        {studentComment}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorFeedbackPage);