# Rêve Voices Application

Link on Heroku: 

## Technologies and Frameworks Used
* Material-UI/core
* Express
* Node.js
* Moment.js
* Passport.js
* postgreSQL
* React, Redux
* Nodemailer, xoauth2


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. These directions are specific to the deployment document given to Rêve Academy which includes the sensitive login information.

### Prerequisites

Link to software that is required to install the app.

- [Node.js](https://nodejs.org/en/)
- [Express.is](https://expressjs.com/)
- [postgreSQL](https://www.postgresql.org/download/)

### Installing

1. To get the development enviroment running, copy this table into the postgreSQL queries: 

```sql
CREATE TABLE program (
	id SERIAL PRIMARY KEY,
	name VARCHAR (250) NOT NULL,
	active_program BOOLEAN DEFAULT TRUE,
	description VARCHAR (5000),
	start TIMESTAMP,
	finish TIMESTAMP
);

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    first VARCHAR (100),
    last VARCHAR (100),
    photo VARCHAR (250),
    high_school VARCHAR (200) DEFAULT 'Pending...',
    instructor BOOLEAN DEFAULT FALSE,
    active_profile BOOLEAN DEFAULT TRUE,
    program_id INT REFERENCES program ON DELETE SET NULL,
    team VARCHAR (100), 
	token VARCHAR (100)
);

CREATE TABLE weeks (
	id SERIAL PRIMARY KEY,
	number INT,
	theme VARCHAR (250),
	description VARCHAR (5000),
	program_id INT REFERENCES program ON DELETE CASCADE,
	current_week BOOLEAN DEFAULT FALSE
);

CREATE TABLE comments(
	id SERIAL PRIMARY KEY,
	person_id INT REFERENCES person ON DELETE CASCADE,
	comment VARCHAR (500),
	date TIMESTAMP,
	week_id INT REFERENCES weeks ON DELETE CASCADE
);

CREATE TABLE likes (
	person_id INT REFERENCES person ON DELETE CASCADE,
	comment_id INT REFERENCES comments ON DELETE CASCADE
);

CREATE TABLE focus(
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	summary VARCHAR(5000),
	week_id INT REFERENCES weeks ON DELETE CASCADE,
	x INT,
	y INT,
	w INT,
	h INT
);

CREATE TABLE strategies(
	id SERIAL PRIMARY KEY,
	title VARCHAR (100),
	summary VARCHAR (1000),
	focus_id INT REFERENCES focus ON DELETE CASCADE
);

CREATE TABLE resources (
	id SERIAL PRIMARY KEY,
	link VARCHAR (500),
	strategy_id INT REFERENCES strategies ON DELETE CASCADE
);

```

2. To download all the required dependancies in the package.json run: 
```
npm install
```
3. To run the development environment on your local machine, in the terminal run: 
```
npm run server
```
4. Then open a second tab in the terminal and run: 
```
npm run client
```
5. Create a .env file as a root file in the application. Copy and paste the API keys into the file. There should be 4 keys copied which are detailed in the deployment document. The 4 keys are SERVER_SESSION_SECRET, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN

## Login Information

Now that the application is running on your local machine, you are sent to a login page. There are two types of login accounts (Student and Admin). Admin's have the ability to update any account to an admin account. 

The Rêve Voices email: reveacademy.register@gmail.com
Password information to access this new email is detailed on the deployment document and should be backed up with an email and phone number. The password should be changed immediately. This is the email that will send out registration emails to new accounts.

In order to log in to the application, sign in with the new Rêve email: reveacademy.register@gmail.com
The password to access the application is detailed in the deployment document and should should be changed immediately using the 'Forgot your password' option.

## Screen Shot

[]

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Admin's are able to create new users by sending a link to student emails
- [x] New users are able to register for their account by the email link sent to them
- [x] Users are able to change their password
- [x] Admin's are able to update user information on the "Manage Accounts" page
- [x] Admin's are able to add and update programs 
- [x] Admin's are able to create week schedules and view student comments 
- [x] Students are able to add comments to specific weeks in their program 
- [x] Students are able to view their program schedules

### Next Steps
- [ ] Allow Admin's to edit what team and program students are in
- [ ] Allow Admin's to sort their search for student's on the manage accounts page (This list will grow as more user's are added and there needs to be some function to sort this information)
- [ ] Sort deactivated student accounts separately from active accounts
- [ ] Allow Admin's to add and edit week themes and descriptions


## Creators of this Application: 

* Ian Carthey github.com/iancarthey
* Tenzin Chosang github.com/Tenzin1993
* Kam Kubesh github.com/KKubesh
* Melody Massard github.com/Melody8988
* Sam Trapskin github.com/Samtrapskin

## Acknowledgments

For login authentication we used this repo to begin working with Passport.js:
https://github.com/PrimeAcademy/prime-solo-project/tree/sql-starter

