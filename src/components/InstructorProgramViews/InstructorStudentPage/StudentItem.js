import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableHead from '@material-ui/core/TableHead';
 import TableRow from '@material-ui/core/TableRow';

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
    textAlign: 'right',

		marginLeft: 140
	},
	table: {
		minWidth: 700
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
			textAlign: 'left'
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
    
    
		}
	
	render() {
		console.log(this.props);
		const { classes } = this.props;

    // STUDENT DATA TABLE
		return (
			<TableBody>
				<TableRow>
					<CustomTableCell>{this.props.student.first}  {this.props.student.last}</CustomTableCell>
					<CustomTableCell>{this.props.student.email}</CustomTableCell>
					<CustomTableCell>{this.props.student.program_id}</CustomTableCell>
					<CustomTableCell>{this.props.student.team}</CustomTableCell>
					<CustomTableCell>{this.props.student.high_school}</CustomTableCell>
					<CustomTableCell>{this.props.count.comment}</CustomTableCell>


   
			  </TableRow>
			</TableBody>
    );
    
    //END STUDENT DATA TABLE
	}
}

export default connect(mapStateToProps)(StudentItem);
