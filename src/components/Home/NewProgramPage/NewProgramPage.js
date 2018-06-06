import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../../Nav/Nav';

//import ManageAccountsPage from '../../Home/ManageAccountsPage/ManageAccountsPage'
//import Home_AllProgramsPage from '../../Home/AllProgramsPage/Home_AllProgramsPage'


import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { 
    TextField, 
    Button, 
    Card, 
    FormControl, 
    Select, 
    InputLabel, 
  
  } from '@material-ui/core';



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
    margin: '15px'
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
      },
      weeksArray: [],
      weeksDisplayed: 30
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

  demoButton = event => {
    this.setState({
      newProgram:{
        name:'2018 Summer Session',
        description:'Developing Program',
        start:'2018-02-05',
        finish:'2018-05-25',
        weeks: 9,
        active_program:true,
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.weeksToDisplay()
  }
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  weeksToDisplay = () => {
    for ( let a = 0; this.state.weeksDisplayed > this.state.weeksArray.length; a+=1 ) {
      this.state.weeksArray.push(a+1)
    }
  }

  render() {

    let content = null;

    let weekOption = this.state.weeksArray.map((week) => {
      return (<option value={week}>{week}</option>)
    })

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
                  <FormControl >
                    <InputLabel>Weeks</InputLabel>
                    <Select
                      native
                      value={this.state.newProgram.weeks}
                      onChange={this.handleNewProgram('weeks')}
                      style={{width: '80px'}}                    
                      inputProps={{
                        id: 'select weeks',
                      }}
                    >
                      <option value={1}/>
                      {weekOption}
                    </Select>
                  </FormControl>
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
                <div style={itemStyle.centerContent}>
                  <Button 
                    style={itemStyle.btn}
                    onClick={this.createNewProgram}
                  >
                    Create Program
                  </Button>
                  <h3 style={{color: "white", fontSize: "20px"}} onClick={this.demoButton}>*</h3>
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