import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InstructorNav from '../../Nav/InstructorNav';
import Button from '@material-ui/core/Button';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import CommentItem from './StudentCommentItem';



const mapStateToProps = state => ({
  user: state.user,
  state,
});

class InstructorFeedbackPage extends Component {
  constructor(props){
    super(props);
    this.state={
      newComment:'',
    }
  }

  handleComment = (event) => {
    this.setState({
      newComment: event.target.value,
    })
  }

  addComment = () => {
    this.props.dispatch({
      type: 'ADD_COMMENT',
      payload: this.state,
    })
    this.setState
  }

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

    let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
      return (<Button variant="fab" color="primary" key={week.id}>{week.number} </Button>)
    })

    let studentComment = this.props.state.instructorFeedBackReducer.allCommentsReducer.map((comment)=>{
      return(<CommentItem key={comment.id} comment={comment}/>)
    })

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
          <h1>
            INSTRUCTOR FEEDBACK PAGE <br/>
            Week #
          </h1>
          <div>{weekList}</div>
          {/* Feedback Container */}
            <textarea style={{fontSize:'25px'}} value={this.state.newComment} onChange={this.handleComment}></textarea>
            <button onClick={this.addComment}>SEND</button>
          <div>
            {studentComment}
          </div>
          {/* End Feedback Container */}
        </div>
      );
    }

    return (
      <div>
       <InstructorNav program_id={this.props.match.params.program_id}/>
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorFeedbackPage);