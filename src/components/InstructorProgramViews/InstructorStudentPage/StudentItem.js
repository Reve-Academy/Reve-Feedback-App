import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

//Material UI Table
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
//import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// MATERIAL UI TABLE STYLING

const CustomTableCell = withStyles((theme) => ({

}))(TableCell);

const styles = {
	test: {
		width: '60%', 
	},
	table: {
		display: 'flex',
		justifyContent: 'center',
	},
	dataCenter: {
	  textAlign: 'center',
	  padding: '10px',
	},

  };


// END MATERIAL UI TABLE STYLING

const mapStateToProps = (state) => ({
	state
});

class StudentItem extends Component {
	

	render() {
		console.log(this.props);
		

		// STUDENT DATA TABLE
		return (
			<TableBody>
				<TableRow hover>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.last} </CustomTableCell>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.first}</CustomTableCell>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.username}</CustomTableCell>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.team}</CustomTableCell>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.high_school}</CustomTableCell>
					<CustomTableCell style={styles.dataCenter}>{this.props.student.total_comments}</CustomTableCell>
				</TableRow>
			</TableBody>
		);

		//END STUDENT DATA TABLE
	}
}

export default connect(mapStateToProps)(StudentItem);
