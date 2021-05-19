DROP DATABASE IF EXISTS trailhike_db;
CREATE database trailhike_db;

USE trailhike_db;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE trail (
    id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    location VARCHAR(50) NOT NULL,
    distance INT NOT NULL,
    elevation INT NOT NULL,
    difficulty VARCHAR(30)
);

CREATE TABLE hike (
    id INT NOT NULL,
    time INT NOT NULL,
    destination VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    trail_id INT NOT NULL
);

CREATE TABLE comment (
    id INT NOT NULL,
    text VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    trail_id INT NOT NULL
);
