import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import InstructorNav from '../../Nav/InstructorNav';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import CommentItem from './StudentCommentItem';
import DayItem from './DayItem';
import { Button } from '@material-ui/core'

const mapStateToProps = state => ({
  user: state.user,
  state,
});

const itemStyle = ({
  centerContent: {
    display: 'flex', 
    justifyContent: 'center',
  },
  centerComments: {
    display: 'flex',
    flexDirection: 'column'
  },
  btn: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
    margin: '10px',
    maxHeight: '36px',    
  },
  commentArea: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
    fontSize: '25px',
    width: '400px',
    height: '100px',
    outline: 'none',    
  }
})

class InstructorFeedbackPage extends Component {
  constructor(props){
    super(props);
    this.state={
      newComment:''
    }
  }

  handleComment = (event) => {
    this.setState({
      newComment: event.target.value,
    })
  }

  addComment = () => {
    console.log('this is state', this.state);
    this.props.dispatch({
      type: 'ADD_COMMENT',
      payload: {
        newComment: this.state.newComment,
        date: '08/17/1993',
        week: this.props.state.instructorFeedBackReducer.weekIdReducer
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({ 
      type: 'GET_FIRST_COMMENT',
      payload: this.props.match.params.program_id
    });
    this.props.dispatch({
      type: 'FETCH_PROGRAM_WEEKS',
      payload: this.props.match.params
    })
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  render() {
    let content = null;
    let weekList = this.props.state.scheduleReducer.weekReducer.map((week) => {
      return (<DayItem  key={week.id} week={week}/>)
    })
    
    let studentComment = this.props.state.instructorFeedBackReducer.allCommentsReducer.map((comment)=>{
      return(<CommentItem key={comment.id} comment={comment}/>)
    })

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
          <h1 className="ManageTitle">
            FEEDBACK
          </h1>
          <div style={itemStyle.centerContent}>{weekList}</div>
          <h2 className="ManageTitle">
              WEEK {this.props.state.instructorFeedBackReducer.weekNumberReducer}
          </h2>
          <div style={itemStyle.centerContent}>
            <h2 className="ManageTitle">
              <strong>Theme of This Week Name</strong>
            </h2>
          </div>  
          {/* Feedback Container */}
          <div style={itemStyle.centerContent}>
            <textarea style={itemStyle.commentArea} value={this.state.newComment} onChange={this.handleComment}></textarea>
          </div>
          <div style={itemStyle.centerContent}>
            <Button style={itemStyle.btn} onClick={this.addComment}>SEND</Button>
          </div>
          {/* End Feedback Container */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={itemStyle.centerComments}>
              {studentComment}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
       <InstructorNav program_id={this.props.match.params.program_id} program_name={this.props.match.params.program_name} />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstructorFeedbackPage);