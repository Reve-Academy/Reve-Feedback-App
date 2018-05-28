import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import LoginNav from '../Nav/LoginNav'

// Material-UI
import TextField from '@material-ui/core/TextField';






const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.userName && this.props.user.userName.instructor) {
      this.props.history.push('/user');
    } else if (this.props.user.userName && this.props.user.userName.instructor === false ){
      this.props.history.push('/StudentFeedback')
    }
  }

  login = (event) => {
    event.preventDefault();

    if (this.state.username === '' || this.state.password === '') {
      this.props.dispatch(formError());
    } else {
      this.props.dispatch(triggerLogin(this.state.username, this.state.password));
    }
  }

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          { this.props.login.message }
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      
      <div className='loginBackground'>
      <LoginNav/>
      
      <div>
        { this.renderAlert() }
       
        <form onSubmit={this.login}>
          <h1 className='loginTitle'>Sign in to <b className="reveVoices">Rêve Voices</b></h1>
          <div>
           
            Email: <TextField className="inputColor"
                    id="emailInput"
                    // label="Email"
                    // placeholder="Email"
                    margin="normal"
                    onChange={this.handleInputChangeFor('username')}
                    value={this.state.username}
                 />
          </div>
          <div>
            {/* <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            </label> */}
            Password: <TextField className="inputColor"
                    id="passwordInput"
                    type="password"
                    // label="Email"
                    // placeholder="Email"
                    margin="normal"
                    onChange={this.handleInputChangeFor('password')}
                    value={this.state.password}
                 />
          </div>
          <div>
            <input
              type="submit"
              name="submit"
              value="Log In"
            />
            {/* <Link to="/register">Register</Link> */}
          </div>
        </form>
        </div>
      </div>
     
    );
    
   
  }
}

export default connect(mapStateToProps)(LoginPage);
