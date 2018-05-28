import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Nav from '../../Nav/Nav';
import ProgramsList from './ProgramsList';

import { USER_ACTIONS } from '../../../redux/actions/userActions';
import { triggerLogout } from '../../../redux/actions/loginActions';

const itemStyle = ({
  centerContent: {
    display: 'flex', 
    justifyContent: 'center'
  }
})

const mapStateToProps = state => ({
  user: state.user,
  state
});

class Home_AllProgramsPage extends Component {
  
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  //on logout, go to login page
  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('/home');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('/home');
  }

  render() {
    
    
    let content = null;
    
    if (this.props.user.userName && this.props.user.userName.instructor) {
      content = (
        <div>
          <div style={itemStyle.centerContent}>
          
            <ul>
            <li style={{border: '2px solid #a0a0a0', margin: '0px 0px 0px -2px'}}>
                <Link to="/newProgram" >
                  New Program
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

          {/* Content Container */}
          <div>
            <h1 className="ManageTitle">
              ALL PROGRAMS
            </h1>

            {/* Programs List */}
            <div style={itemStyle.centerContent}>
              <ProgramsList />
            </div>
            {/* End Programs List */}

          </div>
          {/* End Content Container */}

          {/* <button
              onClick={this.logout}
            >
              Log Out
          </button> */}

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
export default connect(mapStateToProps)(Home_AllProgramsPage);
