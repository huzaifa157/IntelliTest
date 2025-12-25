# IntelliTest

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Importance](#importance)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Database Schema](#database-schema)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contribution Guide](#contribution-guide)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Overview
IntelliTest is a comprehensive MERN-based platform for intelligent test generation, management, and certification. It enables users to register, log in, take dynamically generated tests, view results, and download personalized certificates in PDF format. The system supports multiple qualification levels and difficulty tiers.

## Features
- User registration and authentication (secure, hashed passwords)
- Dynamic test generation by qualification and difficulty
- Result calculation and storage
- PDF certificate generation using PDFKit
- Responsive UI with EJS templates and layouts
- Session management for user state
- Admin-ready database schema
- Role-based access (future-ready)
- Error handling and validation
- Modular code structure for easy maintenance

## Importance
- **Automated Assessment:** Reduces manual effort in test creation and grading.
- **Personalized Testing:** Adapts questions to user qualification and difficulty level.
- **Secure Data Management:** Ensures user data and results are safely stored.
- **Instant Certification:** Provides immediate, downloadable certificates for users.
- **Scalable Architecture:** Easily extendable for more features, roles, or integrations.
- **Educational Value:** Useful for schools, colleges, and online learning platforms.
- 

## Technology Stack
- **Backend:** Node.js, Express.js
- **Frontend:** EJS templating, HTML, CSS
- **Database:** MySQL (with SQL schema)
- **PDF Generation:** PDFKit
- **Authentication:** express-session, bcryptjs
- **Other:** dotenv, body-parser, ejs-mate

## Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/huzaifa157/IntelliTest.git
   cd IntelliTest
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory with:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=testifyiq
   
   ```
4. **Set up the database:**
   - Import `database/scheme.sql` into your MySQL server.
   - Optionally, use `testifyiq.sql` for sample data.
5. **Start the server:**
   ```bash
   node server.js
   ```
6. **Access the app:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration
- **Environment Variables:**
  - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`: MySQL connection
- **Session Secret:** Change in `server.js` for production

## Database Schema
- **users**: Stores user info (id, username, email, password, qualification, created_at)
- **questions**: Test questions (id, qualification, difficulty, question, options, correct_option)
- **results**: Test results (id, user_id, score, total, created_at)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  qualification ENUM('Matric','Intermediate','Graduation'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE questions (
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

CREATE TABLE results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  score INT,
  total INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## Usage Guide
- **Register:** Create a new account with qualification level
- **Login:** Access your dashboard and start tests
- **Take Test:** Answer 10 random questions based on your qualification
- **View Results:** See your score and test summary
- **Download Certificate:** Get a PDF certificate for your result

## API Endpoints
- `GET /` — Home page
- `GET /register` — Registration form
- `POST /register` — Register new user
- `GET /login` — Login form
- `POST /login` — Authenticate user
- `GET /test` — Test dashboard
- `POST /start-test` — Start a new test
- `POST /submit-test` — Submit answers and get results
- `GET /certificate` — Download PDF certificate

## Folder Structure
```
IntelliTest/
├── database_connection.session.sql
├── generateQuestions.js
├── package.json
├── Readme.md
├── server.js
├── testifyiq.sql
├── database/
│   └── scheme.sql
├── public/
│   └── css/
│       └── style.css
├── utils/
│   └── certificate.js
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── result.ejs
│   ├── test.ejs
│   ├── include/
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   └── layouts/
│       └── boilerplate.ejs
```

## Contribution Guide
1. Fork the repository
2. Create a new branch (`git checkout -b feature-xyz`)
3. Commit your changes
4. Push to your branch and open a pull request
5. Describe your changes clearly

## Troubleshooting
- **Database connection errors:**
  - Check `.env` settings and MySQL server status
- **Session issues:**
  - Ensure session secret is set and cookies enabled
- **PDF not downloading:**
  - Check PDFKit installation and browser settings

## License
This project is licensed under the ISC License.
