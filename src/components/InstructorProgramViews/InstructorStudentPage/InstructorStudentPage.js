import React, { Component } from 'react';
import { connect } from 'react-redux';
import InstructorNav from '../../Nav/InstructorNav';
import StudentList from '../InstructorStudentPage/StudentList';
import { USER_ACTIONS } from '../../../redux/actions/userActions';


const mapStateToProps = state => ({
  user: state.user,
});


class InstructorStudentPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
//
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }
//git 

  render() {



    let content = null;

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (      
         
        <div>
      <h1 style={{color: '#D8441C'}}className="ManageTitle">
      <strong>{this.props.match.params.program_name}</strong>
      <br/>STUDENTS
      </h1>
         


          {/* Students Container */}
          <StudentList params={this.props.match.params.program_id} />

          {/* End Students Container */}
        
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
export default connect(mapStateToProps)(InstructorStudentPage);