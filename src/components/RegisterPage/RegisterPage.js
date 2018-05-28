import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginNav from '../Nav/LoginNav';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			
			high_school: '',
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
			const request = new Request('/api/user/register/:id/:token', {
				method: 'PUT',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({
					
					high_school: this.state.high_school,
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
					} else {
						this.setState({
							message: "Ooops! That didn't work. The username might already be taken. Try again!"
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
		return (
			<div>
				<LoginNav />

				<div>
					{this.renderAlert()}
					<form onSubmit={this.registerUser}>
						<h1>Register User</h1>
						<div>
							
							<label htmlFor="high_school">
								High School:
              					<input
									type="text"
									name="high_school"
									value={this.state.high_school}
									onChange={this.handleInputChangeFor('high_school')}
								/>
							</label>
							<br />
							<label htmlFor="username">
								Email:
								<input
									type="text"
									name="username"
									value={this.state.username}
									onChange={this.handleInputChangeFor('username')}
								/>
							</label>
						</div>
						<div>
							<label htmlFor="password">
								Password:
								<input
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleInputChangeFor('password')}
								/>
							</label>
						</div>
						<div>
							<input type="submit" name="submit" value="Register" />
							<Link to="/home">Cancel</Link>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default RegisterPage;
