-- drop ALL tables

DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS friends;
DROP TABLE IF EXISTS users;


-- add ALL tables

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(300) NOT NULL,
    last VARCHAR(300) NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    bioinfo VARCHAR(300),
    profilepictureurl VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat(
    id SERIAL PRIMARY KEY,
    messages VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friends(
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id) NOT NULL,
    receiver_id INTEGER REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT FALSE NOT NULL
);
