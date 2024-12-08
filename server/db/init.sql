-- Create the application database if it doesn't exist
CREATE DATABASE wellness_map;
GRANT ALL PRIVILEGES ON DATABASE wellness_map TO postgres;

-- Switch to the 'wellness_map' database
\connect wellness_map;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
                                     id SERIAL PRIMARY KEY,
                                     name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    credits INTEGER DEFAULT 0,
    role VARCHAR(50) DEFAULT 'user'
    );

-- Create Gyms Table
CREATE TABLE IF NOT EXISTS gyms (
                                    id SERIAL PRIMARY KEY,
                                    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    distance FLOAT NOT NULL,
    description TEXT,
    owner_id INTEGER REFERENCES users(id)
    );

-- Create Classes Table
CREATE TABLE IF NOT EXISTS classes (
                                       id SERIAL PRIMARY KEY,
                                       gym_id INTEGER REFERENCES gyms(id),
    name VARCHAR(255) NOT NULL,
    schedule TIMESTAMP NOT NULL,
    capacity INTEGER NOT NULL
    );

-- Create Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
                                        id SERIAL PRIMARY KEY,
                                        user_id INTEGER REFERENCES users(id),
    gym_id INTEGER REFERENCES gyms(id),
    class_id INTEGER REFERENCES classes(id)
    );