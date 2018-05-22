import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountsItem from '../../Home/ManageAccountsPage/AccountsItem';

const mapStateToProps = state => ({
    user: state.user,
    state,

});

class AccountsList extends Component {
    componentDidMount() {
        //use componentDidMount to dispatch an action to request the AccountsList from the API
        this.props.dispatch({ type: 'GET_ACCOUNT_SAGA' })
    }

    render() {

        //use map to display individual accounts for AccountsItem component
        let accounts = this.props.state.manageAccountsReducer.allAccountsReducer.map(aItem => {
            return (

                <AccountsItem
                    key={aItem.id}
                    aItem={aItem}

                />

            )
        })

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Admin</th>
                            <th>Active</th>
                            <th>Program</th>
                            <th>high_school</th>
                            <th>team</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {accounts}
                </table>
            </div>
        )

    }
}

export default connect(mapStateToProps)(AccountsList);