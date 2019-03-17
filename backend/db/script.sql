CREATE EXTENSION pgcrypto;

CREATE TABLE usermodel (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE event (
    id SERIAL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date date NOT NULL,
    color TEXT DEFAULT '#FFFFFF',
    user_id INTEGER REFERENCES usermodel(id) NOT NULL,
    PRIMARY KEY (id, user_id)
);

CREATE TABLE feedback (
    id SERIAL,
    description TEXT NOT NULL,
    user_id INTEGER REFERENCES usermodel(id) NOT NULL,
    PRIMARY KEY (id, user_id)
);


