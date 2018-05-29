import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentItem from './StudentItem';
import { withStyles } from '@material-ui/core/styles';
//Material UI Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
    textAlign: 'center',
    fontSize: 15
	},
	body: {

	}
}))(TableCell);


  

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    
	},
	table: {
		width: '60%',
		marginLeft: '20%',
		marginRight: '20%',
},

	row: {
		'&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
   

		}
  },
  
 
});


 


const mapStateToProps = (state) => ({
	state
});

class StudentList extends Component {
	componentDidMount() {
		// use component did mount to dispatch an action to request the studentList from the API
		this.props.dispatch({ type: 'GET_STUDENT_LIST_SAGA' });
	}

	render() {
		// MAPPING OVER GET RESPONSE FROM GET STUDENT LIST REQUEST
		let listOfStudents = this.props.state.studentListReducer.studentListReducer.map((student) => {
				return <StudentItem key={student.id} student={student} />;
			});
		

		return (
			<div>
				{/* TABLE HEADER */}
				<Table style={styles.table}>
					<TableHead>
						<TableRow>
							<CustomTableCell>Student Name</CustomTableCell>
							<CustomTableCell>Email</CustomTableCell>
							<CustomTableCell>Current Program</CustomTableCell>
							<CustomTableCell>Team Name</CustomTableCell>
							<CustomTableCell>Highschool</CustomTableCell>
							 <CustomTableCell>Total Comments</CustomTableCell>
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
