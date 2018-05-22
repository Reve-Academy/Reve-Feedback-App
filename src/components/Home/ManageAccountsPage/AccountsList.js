import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountsItem from './AccountsItem';

const mapStateToProps = state => ({
    state,
  });

  class AccountsList extends Component {
      componentDidMount() {
          //use componentDidMount to dispatch an action to request the AccountsList from the API
          this.props.dispatch({ type: 'GET_ACCOUNT_SAGA'})
      }

      render() {
          
        console.log('state', this.props.state);
        // console.log('user', this.props.state.user);
        // let programs = this.props.state.manageAccountsReducer.

        return (
            <div>
            <p>hi</p>
            </div>
        )
      }
  }

  export default connect(mapStateToProps)(AccountsList);