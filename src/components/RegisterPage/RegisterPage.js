import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginNav from '../Nav/LoginNav';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			first: '',
			last: '',
			high_school: '',
			username: '',
			password: '',
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
			const request = new Request('api/user/register', {
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				body: JSON.stringify({
					first: this.state.first,
					last: this.state.last, 
					high_school: this.state.high_school,
					username: this.state.username,
					password: this.state.password
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
							<label htmlFor="first">
								First Name:
              					<input
									type="text"
									name="first"
									value={this.state.first}
									onChange={this.handleInputChangeFor('first')}
								/>
							</label>
							<br />
							<label htmlFor="last">
								Last Name:
              					<input
									type="text"
									name="last"
									value={this.state.last}
									onChange={this.handleInputChangeFor('last')}
								/>
							</label>
							<br />
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
