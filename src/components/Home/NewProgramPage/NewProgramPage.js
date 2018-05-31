import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../../Nav/Nav';

import ManageAccountsPage from '../../Home/ManageAccountsPage/ManageAccountsPage'
import Home_AllProgramsPage from '../../Home/AllProgramsPage/Home_AllProgramsPage'


import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { TextField, Button, Card } from '@material-ui/core';



const mapStateToProps = state => ({
  user: state.user,
});

const itemStyle = ({
  reveCard: {
    padding: '10px',
	  margin: '10px',
	  border: '1px solid #D8441C',
    borderRadius: '25px',
    width: '400px'
  },
  btn: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
  },
  centerColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputFields: {
    padding: '15px 30px'
  }
})

class NewProgramPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      newProgram: {
        name:'',
        description:'',
        start:'',
        finish:'',
        weeks:'',
        active_program:true,
      }
    }
  }

  handleNewProgram = (property) => {
    return (event) =>{
      this.setState({
        newProgram:{
          ...this.state.newProgram,
          [property]:event.target.value,
        }
      })
    }
  }
  createNewProgram = event => {
    event.preventDefault();
    this.props.dispatch({
      type: 'POST_NEW_PROGRAM',
      payload: this.state.newProgram
    })
    this.setState({
      newProgram:{
        name:'',
        description:'',
        start:'',
        finish:'',
        weeks:'',
        active_program:true,
      }
    })
    
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }


  render() {

    let content = null;

    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>

          <div>
          <div style={itemStyle.centerContent}>
          
            <ul>
            <li style={{border: '2px solid #a0a0a0', margin: '0px 0px 0px -2px'}}>
                <Link to="/newProgram" >
                  NEW PROGRAM
                </Link>
              </li>
            
              <li style={{border: '2px solid #a0a0a0'}}>
                <Link to="/manageAccounts" >
                  Manage Accounts
                </Link>
              </li>
              <li style={{border: '2px solid #a0a0a0', margin: '0px -2px 0px 0px'}}>
                <Link to="/user" >
                  All Programs
                </Link>
              </li>
            </ul>
          
          </div>
          </div>

          <div>
            <h1 className="ManageTitle">
              New Program
            </h1>
          </div>
          <div style={itemStyle.centerContent}>
            <Card style={itemStyle.reveCard}>
              <div style={itemStyle.centerColumn}>
                <div style={itemStyle.inputFields}>
                  <TextField 
                    label="Name of Program"
                    value={this.state.newProgram.name} 
                    margin="normal"
                    onChange={this.handleNewProgram('name')}
                  />
                </div>
                <div style={itemStyle.inputFields}>
                  <TextField 
                    label="Description"           
                    value={this.state.newProgram.description} 
                    onChange={this.handleNewProgram('description')}
                  />
                </div>
                <div style={itemStyle.inputFields}>
                  <TextField 
                    placeholder="mm/dd/yyyy" 
                    type="date"
                    margin="normal"
                    value={this.state.newProgram.start} 
                    onChange={this.handleNewProgram('start')}
                  />
                </div>
                <div style={itemStyle.inputFields}>
                  <TextField 
                    placeholder="mm/dd/yyyy" 
                    type="date"
                    margin="normal"
                    value={this.state.newProgram.finish} 
                    onChange={this.handleNewProgram('finish')}
                  />
                </div>
                <div style={itemStyle.inputFields}>
                  <TextField 
                    label="Number of weeks" 
                    margin="normal"
                    value={this.state.newProgram.weeks} 
                    onChange={this.handleNewProgram('weeks')}
                  />
                </div>
                <div style={itemStyle.centerContent}>
                  <Button 
                    style={itemStyle.btn}
                    onClick={this.createNewProgram}
                  >
                    Create Program
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(NewProgramPage);