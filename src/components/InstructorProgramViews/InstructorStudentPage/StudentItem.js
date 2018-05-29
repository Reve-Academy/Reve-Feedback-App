import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

//Material UI Table
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// MATERIAL UI TABLE STYLING

const CustomTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.red,
		color: theme.palette.common.white,
		fontSize: 12,
		fontStyle: 'bold'
	},
	body: {
		fontSize: 18,
		textAlign: 'center',
		marginLeft: 20
	}
}))(TableCell);

const styles = (theme) => ({
	root: {
		width: '80%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	
	},
	table: {
		minWidth: 700,
		marginLeft: 20
	
		
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
			// textAlign: 'left'
		}
	},

	
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
					<CustomTableCell>
						{this.props.student.first} {this.props.student.last}
					</CustomTableCell>
					<CustomTableCell>{this.props.student.email}</CustomTableCell>
					<CustomTableCell>{this.props.student.program_id}</CustomTableCell>
					<CustomTableCell>{this.props.student.team}</CustomTableCell>
					<CustomTableCell>{this.props.student.high_school}</CustomTableCell>
					<CustomTableCell>{this.props.student.total_comments}</CustomTableCell>
				</TableRow>
			</TableBody>
		);

		//END STUDENT DATA TABLE
	}
}

export default connect(mapStateToProps)(StudentItem);
