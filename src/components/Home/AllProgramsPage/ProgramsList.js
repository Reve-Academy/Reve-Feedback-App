import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgramItem from './ProgramItem';

const mapStateToProps = state => ({
    state,
});

class ProgramsList extends Component {
  componentDidMount() {
    // use component did mount to dispatch an action to request the studentList from the API
    this.props.dispatch({ type: 'GET_PROGRAM_SAGA'});
  }

  render() {
      console.log(this.props.state.home_AllProgramPageReducer.allProgramsReducer);
      
    let programs = this.props.state.home_AllProgramPageReducer.allProgramsReducer.map(pItem => {
      return (
        <ProgramItem 
            key={pItem.id} 
            pItem={pItem}
        />
      )
    })
    
    return(
      <div>
        {programs}
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProgramsList);