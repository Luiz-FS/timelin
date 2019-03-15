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
    user_id INTEGER REFERENCES usermodel(id),
    PRIMARY KEY (id, user_id)
);
