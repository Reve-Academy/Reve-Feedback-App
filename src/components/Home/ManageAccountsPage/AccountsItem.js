import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    state,
});

class AccountsItem extends Component {

    render(){

        return(
    
            
           
              <tr>
              <td>{this.props.aItem.first}</td>
              <td>{this.props.aItem.last}</td>
              <td>{this.props.aItem.instructor}</td>
              <td>{this.props.aItem.active_profile}</td>
              <td>{this.props.aItem.program}</td>
              <td><button>Delete</button></td>
              </tr>
            
         
        )
    }
    
}

export default connect(mapStateToProps)(AccountsItem)


