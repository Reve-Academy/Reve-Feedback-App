import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountsItem from '../../Home/ManageAccountsPage/AccountsItem';

//Material-UI Table
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';

//Style properties for accounts table
const CustomTableCell = withStyles(theme => ({
  }))(TableCell);

  const styles = {
    test: {
        width: '85%', 
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
    },

  tableHead: {
	textAlign: 'center',
    padding: '10px',
    color: '#D8441C'
  },

};


//Recieve from Redux
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
            
    
            <div style={styles.table}>
               
                <Table style={styles.test}>
                <TableHead>
                        <TableRow>
                        <CustomTableCell style={styles.tableHead}>Last</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>First</CustomTableCell>
                        
                        <CustomTableCell style={styles.tableHead}>Admin</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>Active</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>Program</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>School</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>Team</CustomTableCell>
                        <CustomTableCell style={styles.tableHead}>Delete</CustomTableCell>
                            </TableRow>
                    </TableHead>
                    {accounts}
                </Table>
             
            </div>
        )

    }
}



export default connect(mapStateToProps)(AccountsList);

