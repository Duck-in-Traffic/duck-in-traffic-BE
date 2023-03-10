-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR NOT NULL,
  password_hash VARCHAR NOT NULL,
  username VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR
);

DROP TABLE IF EXISTS studios;

CREATE TABLE studios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  city VARCHAR,
  country VARCHAR
);

DROP TABLE IF EXISTS scores;

CREATE TABLE scores (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
);

DROP TABLE IF EXISTS inventories;

CREATE TABLE inventories (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL,
  coins INT,
  skins VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users(id),
);
