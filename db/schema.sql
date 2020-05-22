DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE films (
    id PRIMARY_KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR (50) NOT NULL,
    released INT NOT NULL,
    rated VARCHAR (10),
    plot VARCHAR (100),
    genre VARCHAR (25) NOT NULL,
    runtime INT NOT NULL,
    ratings VARCHAR (10),
    poster VARCHAR (250),
    director_id FK something there
);

CREATE TABLE directors (
    id PRIMARY_KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR (50) NOT NULL
);

CREATE TABLE tv_shows (
    id PRIMARY_KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR (50) NOT NULL,
    year VARCHAR (10) NOT NULL,
    rated VARCHAR (10),
    plot VARCHAR (100),
    genre VARCHAR (25), NOT NULL,
    runtime INT NOT NULL,
    ratings VARCHAR (10),
    seasons INT NOT NULL,
    poster VARCHAR (250),
    writer_id FK something here
);

CREATE TABLE writers (
    id PRIMARY_KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR (50) NOT NULL
);
