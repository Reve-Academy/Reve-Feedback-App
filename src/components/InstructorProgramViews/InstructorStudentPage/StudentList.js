import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentItem from './StudentItem';

const mapStateToProps = state => ({
    state,
});

class StudentList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the studentList from the API

  }

   render() {
//     // let students = this.props.state.student.map((student) => {
//     //   return (
//     //     <StudentItem 
//         // key={student.id} 
//         // student={students}/>
//       )
//     })
    
     return(
       <div>
         {/* {students} */}
       </div>
     )
   }
 }

export default connect(mapStateToProps)(StudentList);