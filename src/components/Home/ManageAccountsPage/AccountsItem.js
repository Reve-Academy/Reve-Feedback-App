import React, { Component } from 'react';
import { connect } from 'react-redux';

//import material-ui
import CheckBox from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlank from '@material-ui/icons/CheckBoxOutlineBlank'

//Material-UI Table
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//Style properties for accounts table
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
  
 


//Recieve from redux
const mapStateToProps = state => ({
    state,
});

class AccountsItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.aItem.id,
            instructor: this.props.aItem.instructor,
            active: this.props.aItem.active_profile
        }
    }

    //Dispatch account ACTIVE STATUS
    handleActive = () => {
        this.props.dispatch({
            type: 'UPDATE_ACTIVE_STATUS',
            payload: this.state
        })

    }

    //Dispatch account INSTRUCTOR STATUS
    handleInstructor = () => {
        this.props.dispatch({
            type: 'UPDATE_ADMIN_STATUS',
            payload: this.state
        })
    }

    handleDelete = () => {
        this.props.dispatch({
            type: 'DELETE_ACCOUNT', 
            payload: this.state
        })
    }

    render() {
        //True and false to be displayed as checkboxes
        let active;

        if (this.props.aItem.active_profile === true) {
            active = (<CheckBox onClick={() => this.handleActive()}/>)

        } else {
            active = (<CheckBoxOutlineBlank onClick={() => this.handleActive()}/>)
        }

        let instructor;

        if (this.props.aItem.instructor === true) {
            instructor = (<CheckBox onClick={() => this.handleInstructor()}/>)

        } else {
            instructor = (<CheckBoxOutlineBlank onClick={() => this.handleInstructor()}/>)
        }




        return (
            <TableBody>
                <TableRow >
                <CustomTableCell>{this.props.aItem.first}</CustomTableCell>
                     <CustomTableCell>{this.props.aItem.last}</CustomTableCell>
                     <CustomTableCell>{instructor}</CustomTableCell>
                     <CustomTableCell>{active}</CustomTableCell>
                     <CustomTableCell>{this.props.aItem.name}</CustomTableCell>
                     <CustomTableCell>{this.props.aItem.high_school}</CustomTableCell>
                     <CustomTableCell>{this.props.aItem.team}</CustomTableCell>
                     <CustomTableCell onClick={() => this.handleDelete()}><button>Delete</button></CustomTableCell>
                </TableRow>
                </TableBody>
        )
    }
}

export default connect(mapStateToProps)(AccountsItem)


//hellloo


