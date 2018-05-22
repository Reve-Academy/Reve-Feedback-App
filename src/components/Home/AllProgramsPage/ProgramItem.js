import React, { Component } from 'react';

class ProgramItem extends Component {

  render() {
      console.log(this.props.pItem);
      
    return(
      <div>
        <h1>{this.props.pItem.name}</h1>
      </div>
    )
  }
}

export default ProgramItem;