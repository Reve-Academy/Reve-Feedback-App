import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';


// MATERIAL UI TABLE STYLING

const CustomTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		textAlign: 'center',
		paddingLeft: 45
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const styles = (theme) => ({
	root: {
		width: '80%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		marginLeft: 140
	},
	table: {
		minWidth: 700
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
			textAlign: 'center'
		}
	}
});
 
// END MATERIAL UI TABLE STYLING

const mapStateToProps = (state) => ({
	state
});

class StudentItem extends Component {
	constructor(props) {
    super(props);
    
    //SEPARATE ITEMS FROM STUDENT LIST RESPONSE ARRAY
		listOfStudent: {
			first: this.props.student.first;
			last: this.props.student.last;
			email: this.props.student.email;
		}
	}
	render() {
		console.log(this.props);
		const { classes } = this.props;

    // STUDENT DATA TABLE
		return (
			<TableBody>
				<TableRow>
					<CustomTableCell>{this.props.student.first}  {this.props.student.last}</CustomTableCell>
          <CustomTableCell></CustomTableCell>
          <CustomTableCell></CustomTableCell>
          <CustomTableCell></CustomTableCell>
          <CustomTableCell></CustomTableCell>
          <CustomTableCell></CustomTableCell>   
			  </TableRow>
			</TableBody>
    );
    
    //END STUDENT DATA TABLE
	}
}

export default connect(mapStateToProps)(StudentItem);
