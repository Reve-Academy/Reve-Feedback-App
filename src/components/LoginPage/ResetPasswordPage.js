import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginNav from '../Nav/LoginNav';

//Material-UI
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

//Recieve from Redux
const mapStateToProps = state => ({
    state,
  });

  //Modal Styling
const styles = theme => ({
	
	btn: {
	  borderRadius: '15px',
	  border: '1px solid #D8441C',
	  marginTop: '30px',
	  maxHeight: '36px',  
	},
	cancel: {
		marginTop: '20px',
		color: '#D8441C',
	}
  });  


class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

			username: '',
			password: '',
			id: this.props.match.params.id,
			token: this.props.match.params.token,
			message: ''
		};
	}

	//when a user registers it's actually an UPDATE
	registerUser = (event) => {
		event.preventDefault();

		if (this.state.username === '' || this.state.password === '') {
			this.setState({
				message: 'Choose a username and password!'
			});
		} else {

			const request = new Request('/api/user/register/:token', {
				method: 'PUT',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({

					username: this.state.username,
					password: this.state.password,
					id: this.state.id,
					token: this.state.token
				})

			});

			// making the request to the server to post the country
			fetch(request)
				.then((response) => {
					if (response.status === 201) {
						this.props.history.push('/home');
					} else if (response.status === 401) {
						this.setState({
							message: "That link is expired"
						});
					}
				})
				.catch(() => {
					this.setState({
						message: 'Ooops! Something went wrong! Is the server running?'
					});
				});

		}
	};

//this will be an update

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value
		});

	};

	renderAlert() {
		if (this.state.message !== '') {
			return (
				<h2 className="alert" role="alert">
					{this.state.message}
				</h2>
			);
		}
		return <span />;
	}

	render() {
		const { classes } = this.props;
		return (
			<div className="loginBackground">
				<div >
					<LoginNav />
					{this.renderAlert()}
					<div >
					<form className="RegisterForm" onSubmit={this.registerUser}>
						<h2 className='loginTitle'>Please enter your email and type your new password</h2>
						<div>
							
							<br />
							<TextField className="inputColor"
								id="emailInput"
								margin="normal"
								label="Email"
								placeholder="Email"
								onChange={this.handleInputChangeFor('username')}
								value={this.state.username}
							/>
						</div>
						<div>
							<TextField className="inputColor"
								id="passwordInput"
								margin="normal"
                                label="Password"
                                type="password"
								placeholder="Password"
								onChange={this.handleInputChangeFor('password')}
								value={this.state.password}
							/>
						</div>
						<div>
						<Link className={classes.cancel} to="/home">Cancel</Link>
						<br/>
							<Button type="submit" name="submit" className={classes.btn} variant="outlined" color="primary" >Set as New Password</Button>
							
						</div>
					</form>
					</div>
				</div>
			</div>
		);
	}
}


let registerPageWithStyle = withStyles(styles)(RegisterPage)
export default connect(mapStateToProps)(registerPageWithStyle);