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

