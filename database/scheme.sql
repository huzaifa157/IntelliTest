CREATE DATABASE IF NOT EXISTS testifyiq;
USE testifyiq;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    qualification ENUM('Matric','Intermediate','Graduation'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    qualification ENUM('Matric','Intermediate','Graduation'),
    difficulty ENUM('Easy','Medium','Hard'),
    question TEXT,
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    correct_option INT
);

-- Results Table (Linked to Users)
CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    score INT,
    total INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);