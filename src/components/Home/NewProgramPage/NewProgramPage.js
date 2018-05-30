import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from '../../Nav/Nav';

import ManageAccountsPage from '../../Home/ManageAccountsPage/ManageAccountsPage'
import Home_AllProgramsPage from '../../Home/AllProgramsPage/Home_AllProgramsPage'


import { USER_ACTIONS } from '../../../redux/actions/userActions';



const mapStateToProps = state => ({
  user: state.user,
});

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
            <ul>
            <li>
                <Link to="/newProgram" >
                  New Program
                </Link>
              </li>
            
              <li>
                <Link to="/manageAccounts" >
                  Manage Accounts
                </Link>
              </li>
              <li>
                <Link to="/user" >
                  All Programs
                </Link>
              </li>
          
            
            </ul>
          </div>

          <div>
          <h1>
             New Program
          </h1>
          </div>

          
          Name of Program <br/>
          <input placeholder="Name of Program" value={this.state.newProgram.name} onChange={this.handleNewProgram('name')}></input><br/>
          Description <br/>
          <input placeholder="Description" value={this.state.newProgram.description} onChange={this.handleNewProgram('description')}></input><br/>
          Start Date <br/>
          <input placeholder="mm/dd/yyyy" value={this.state.newProgram.start} onChange={this.handleNewProgram('start')}></input><br/>
          End Date <br/>
          <input placeholder="mm/dd/yyyy" value={this.state.newProgram.finish} onChange={this.handleNewProgram('finish')}></input><br/>
          Number of Weeks <br/>
          <input placeholder="Number of weeks" value={this.state.newProgram.weeks} onChange={this.handleNewProgram('weeks')}></input>
          <button onClick={this.createNewProgram}>Create Program</button>
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