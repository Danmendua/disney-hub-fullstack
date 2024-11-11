CREATE DATABASE IF NOT EXISTS disney;

SET timezone = 'America/Sao_Paulo';

DROP TABLE IF EXISTS favoritos;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    genero VARCHAR(9) NOT NULL,
  	profile_picture VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    warning BOOLEAN DEFAULT FALSE NOT NULL,
    active BOOLEAN DEFAULT TRUE NOT NULL,
    verification_token VARCHAR(255) UNIQUE,
    verification_token_expires_at TIMESTAMP,
    new_pass_token VARCHAR(255) UNIQUE,
    new_pass_token_expires_at TIMESTAMP
);

CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    movie_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    genre_ids INT[] NOT NULL,
    overview TEXT NOT NULL,
    popularity NUMERIC(20, 3) NOT NULL,
    backdrop_path VARCHAR(255) NOT NULL,
    vote_average NUMERIC(20, 3) NOT NULL,
    vote_count NUMERIC(20, 3) NOT NULL
);