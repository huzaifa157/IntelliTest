const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mysql = require("mysql2");
const path = require("path");



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));



app.set("view engine", "ejs");

dotenv.config(); // Load environment variables

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

// Routes
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/test", (req, res) => {
  res.render("test");
});



// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
