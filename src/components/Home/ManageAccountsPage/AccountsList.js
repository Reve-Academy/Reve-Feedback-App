import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountsItem from './AccountsItem';

const mapStateToProps = state => ({
    user: state.user,
  });

  class AccountsList extends Component {
      componentDidMount() {
          //use componentDidMount to dispatch an action to request the AccountsList from the API
          this.props.dispatch({ type: 'GET_ACCOUNTSLIST'})
      }

      render() {
          
        console.log('state', this.props.state);
        // console.log('user', this.props.state.user);

        return (
            <div>
                hi
            </div>
        )
      }
  }

  export default connect(mapStateToProps)(AccountsList);