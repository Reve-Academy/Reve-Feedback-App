import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentItem from './StudentItem';

const mapStateToProps = state => ({
    state,
});

class StudentList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the studentList from the API
    this.props.dispatch({ type: 'GET_STUDENT_LIST_SAGA'});
  }

  render() {
    console.log(this.props.state.studentListReducer.studentListReducer);

    let listOfStudents = this.props.state.studentListReducer.studentListReducer.map(student => {


       return (
        <StudentItem
          key={student.id}
        />
      //    key={studentList.id} 
      //    studentList={student}/>
      // 
    )
  })
  
     
    return(
      <div>
        
         {listOfStudents} 
      </div>
    )
  }
}

export default connect(mapStateToProps)(StudentList);