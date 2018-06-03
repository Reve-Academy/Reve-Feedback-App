import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { triggerLogin, formError, clearError } from '../../redux/actions/loginActions';
import LoginNav from '../Nav/LoginNav'
import ForgotPasswordModal from '../LoginPage/ForgotPassword';

// Material-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';



//Style properties for forgot password modal
function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    borderRadius: 25,
    border: '2px solid #595959',
  };
}

//Modal Styling
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  btn: {
    borderRadius: '15px',
    border: '1px solid #D8441C',
    margin: '10px',
    maxHeight: '36px',  
  },
});



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
      open: false,
    };
  }

  componentDidMount() {
    this.props.dispatch(clearError());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.userName && this.props.user.userName.instructor) {
      this.props.history.push('/user');
    } else if (this.props.user.userName && this.props.user.userName.instructor === false) {
      this.props.history.push(`/StudentFeedback/${this.props.user.userName.program}`)
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


  //on click of 'forgot password?', open modal
  handleResetModal = () => {
    this.setState({ open: true });
  };
  //on click of outside modal, close modal
  handleClose = () => {
    this.setState({ open: false });
  };

  renderAlert() {
    if (this.props.login.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.props.login.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <body id="page">
      <ul className="cb-slideshow">
            <li><span>Image 01</span></li>
            <li><span>Image 02</span></li>
            <li><span>Image 03</span></li>
            <li><span>Image 04</span></li>
            <li><span>Image 05</span></li>
            <li><span>Image 06</span></li>
        </ul>
      <div className="login-content">
        <LoginNav />
        <div>
          {this.renderAlert()}
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
              <Button type="submit" name="submit" className={classes.btn} variant="outlined" color="primary" >Log in</Button>
              {/* <Link to="/register">Register</Link> */}
              <Button className={classes.btn} variant="outlined" color="primary" onClick={this.handleResetModal}>Forgot Password?</Button>
              <div>
                <Modal
                  aria-labelledby="Forgot Password?"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <ForgotPasswordModal />
                  </div>
                </Modal>
              </div>
            </div>
          </form>
        </div>
      </div>
      </body>
    );
  }
}

let loginWithStyle = withStyles(styles)(LoginPage)
export default connect(mapStateToProps)(loginWithStyle);


