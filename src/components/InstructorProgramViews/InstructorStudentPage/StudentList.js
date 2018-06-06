import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentItem from './StudentItem';
import { withStyles } from '@material-ui/core/styles';

//Material UI Table
import Table from '@material-ui/core/Table';
//import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import red from '@material-ui/core/colors/red';
//import Paper from '@material-ui/core/Paper';
//import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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

const mapStateToProps = (state) => ({
	state
});

class StudentList extends Component {
	createSortHandler = property => event => {
		this.props.onRequestSort(event, property);
	};
	componentDidMount() {
		// use component did mount to dispatch an action to request the studentList from the API
		this.props.dispatch({ 
			type: 'GET_STUDENT_LIST_SAGA'
		});
	}

	render() {
		const { order, orderBy} = this.props;
		console.log('THIS IS PARAMS', this.props.params)
		// MAPPING OVER GET RESPONSE FROM GET STUDENT LIST REQUEST
		let filteredStudentReducer = this.props.state.studentListReducer.studentListReducer
		let studentList = filteredStudentReducer.filter(student => student.program_id == this.props.params)
		let listOfStudents = studentList.map((student) => {
				return <StudentItem key={student.id} student={student} />;
				
			});
		
			console.log('list of students:', listOfStudents)
		return (
			<div style={styles.table}>
				{/* TABLE HEADER */}
				<Table style={styles.test}>
					<TableHead>
						<TableRow>
							<CustomTableCell style={styles.tableHead}>
								<TableSortLabel onClick={this.createSortHandler()}>Last</TableSortLabel>
							</CustomTableCell>
		
							<CustomTableCell style={styles.tableHead}> 
								<TableSortLabel onClick={this.createSortHandler()}>First</TableSortLabel>
							</CustomTableCell>

							<CustomTableCell style={styles.tableHead}>
								<TableSortLabel onClick={this.createSortHandler()}>Email</TableSortLabel>
							</CustomTableCell>

							<CustomTableCell style={styles.tableHead}>
								<TableSortLabel onClick={this.createSortHandler()}>Team Name</TableSortLabel>
							</CustomTableCell>

							<CustomTableCell style={styles.tableHead}>
								<TableSortLabel onClick={this.createSortHandler()}>School</TableSortLabel>
							</CustomTableCell>

							<CustomTableCell style={styles.tableHead}>
								<TableSortLabel onClick={this.createSortHandler()}>Total Comments</TableSortLabel>
							</CustomTableCell>
						</TableRow>
					</TableHead>
					{listOfStudents}
				</Table>

				{/* END TABLE HEADER */}
			</div>
		);
	}
}

export default connect(mapStateToProps)(StudentList);
