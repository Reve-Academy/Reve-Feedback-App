import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';



const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    paddingLeft: 45,
  },
  body: {
    fontSize: 14,
  },

 

}))(TableCell);



const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    marginLeft: 140,
  },
  table: {
    minWidth: 700,
    
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      textAlign: 'center',

    },
  },
});


  let id = 0;
  function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }


const data = [
  createData('Brainstorming', 'Green Team', 'Rosevelt Highschool', 4.0),
  createData('Jane Doe', 'Brainstorming', 'Red Team', 'North Highschool', 14.0),
  createData('Pat Johnson', 'Brainstorming', 'Yellow Team', 'Washburn Highschool', 7.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class InstructorStudentTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      classes: '' 
    }

  }

  render() {

    const { classes } = this.props;

  return (
    <Paper className={classes.root} elevation={14}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>            
            <CustomTableCell>Student Name</CustomTableCell>
            <CustomTableCell>Current Program</CustomTableCell>
            <CustomTableCell>Team Name</CustomTableCell>
            <CustomTableCell>Highschool</CustomTableCell>
            <CustomTableCell>Total Comments</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow className={classes.row} >
                <CustomTableCell component="th" scope="row">
                {classes.id}
                </CustomTableCell>
                <CustomTableCell numeric>{n.calories}</CustomTableCell>
                <CustomTableCell numeric>{n.fat}</CustomTableCell>
                <CustomTableCell numeric>{n.carbs}</CustomTableCell>
                <CustomTableCell numeric>{n.protein}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );


    
  }

}
export default withStyles(styles)(InstructorStudentTable);
